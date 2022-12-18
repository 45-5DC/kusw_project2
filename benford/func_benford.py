import cv2 
import numpy as np

def compute_first_digits(img, normalize=True, debug_dct=False):
    # 이미지를 gray scale로 읽어옴
    if isinstance(img, str):
        img = cv2.imread(img, 0)
    # 컬러 이미지가 들어오면 gray scale 로 바꿔줌
    if len(img.shape) == 3:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    

    # 속도 이슈도 있고 하니 가장 큰 조작이 가해졌을 곳으로 기대되는 중간으로 크롭
    h, w = img.shape
    if h > 224 and w > 224:
        img = img[int(h / 2 - 112): int(h / 2 + 112),  int(w / 2 - 112):  int(w / 2 + 112)]
    
    # dct 는 shape이 짝수여야 한다고 함, 홀수면 처리를 해줌
    # if img.shape[0] % 2:
    #     img = img[:img.shape[0] - 1,:]
    
    # if img.shape[1] % 2:
    #     img = img[:,:img.shape[1] - 1]
    # 0 ~ 255 로 normalize 
    if normalize:
        img = cv2.normalize(img, np.zeros(img.shape), 0, 255, cv2.NORM_MINMAX)
    
    # 0 ~ 1 로 다시 normalize 후 descrete cosine transform, 어짜피 First Digit 만 구할꺼니 abs 까지
    img = cv2.dct(np.float32(img) / 255.0)
    img = np.abs(img)

    # 0 인 경우 로그에 들어갈 때 문제가 생김
    img = img[img != 0]
    min_val = img.min()

    if min_val < 1:
        img = np.power(10, -np.floor(np.log10(min_val))) * img

    # 위 코드를 지나면 모두 1.0 보다 커야겠죠? 혹시 몰라서 있는건가
    if not (img >= 1.0).all():
        raise ValueError("Error")
    
    # [1, 10) 은 0, [10, 100) 은 1, 이런느낌
    digits = np.log10(img).astype(int).astype('float32')
    first_digits = img / np.power(10, digits)
    first_digits = first_digits.astype(int)

    # ??
    first_digits = first_digits[first_digits != 0]

    
    return first_digits

def compute_first_digits_counts(img, normalise=True):
    first_digits = compute_first_digits(img, normalise)
    unq, counts = np.unique(first_digits, return_counts=True)
    return unq, counts

def compute_first_digits_prob(img, normalise=True):
    unq, counts = compute_first_digits_counts(img, normalise)
    counts = counts / sum(counts)
    return counts