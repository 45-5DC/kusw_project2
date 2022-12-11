# 데이터셋 최종 정리

- real

|                   | CelebA                       | LFW         | FFHQ             |
| ----------------- | ---------------------------- | ----------- | ---------------- |
| 사이즈            | 178 X 218                    | 250 X 250   | 1024 X 1024      |
| 총 개수           | 202,599                      | 13,233      | 70,000           |
| testset 개수(1/5) | 40,520                       | 2,646       | 14,000           |
| 진행 상황         | 다 올렸는데 구드에서 처리 중 | 다시 해야함 | 35000개만 구드에 |

- fake (개수(생성 or 가져옴) / 사이즈)

| 학습데이터 / GAN 종류 | StyleganXL                    | StraGAN                    |     |
| --------------------- | ----------------------------- | -------------------------- | --- |
| CelebA                |                               | 6,000(다운 받음) / 256X256 |     |
| LFW                   |                               |                            |     |
| FFHQ                  | 40,000(직접 생성) / 1024X1024 |                            |     |

일단 아래 구조를 만들고 시작한다

- 초기 데이터 구조

```.
├── fake
│   ├── CelebA256_StarGAN
│   ├── ?_StyleGAN2
│   └── FFHQ1024_StyleGANXL 39697
└── real
    ├── CelebA
    ├── FFHQ
    └── LFW 35000
```

위 구조를 완성한 후에, 각 폴더의 내용을 `<project_directory>/all_images` 폴더로 복사하는 작업을 진행한다. 이 과정을 통해 각 데이터를 train, test, validation 으로 구분할 것이다.

이 과정에서 앙상블 모델의 fake 데이터 별로 학습시킬 데이터셋을 따로 만들어 주어야 한다. real은 모두 공통적으로 포함되므로

---

**코랩 이슈로 전략 변경**

어짜피 데이터는 항상 generator 가 파일 이름으로 가져온다. 따라서 굳이 코랩에 온갖 압축 파일을 올려서 사용하지 않고 한 번에 한 폴더씩 정리해서 `fileList`, `labelList`를 정리 후 깔끔하게 압축하여 업로드 후 압축을 푸는 전략을 취하자

현재 상황은 FFHQ 폴더에 폴더에 일단 real 파일은 제대로 압축이 풀리지 않은 상태이다. 그럼 새로 allimages..

걍 로컬에서 작업 싹 하고 올리는게 나아보임

1. 일단 ffhq 이미지 35000장 다운, 압축 풀고 한 곳으로 옮기기, 다 이후 fileList 받아서 한 곳에 다 옮김
2. filename, root folder(위의 LFW, FFHQ, CelebA 같은 것들), label(0 혹은 1) 형태로 csv를 계속 이어붙인다

**celebA** 데이터셋은 너무 많아서 `~/CelebA` 폴더에 압축을 푸는걸로 하자

일단 FFHQ real 35000 개

FFHQ, FFHQ_StyleGAN3XL 의 경로는 `/content/total_image`  
CelebA의 경로는 `content/dataset/CelebA/CelebA0 ~ CelebA4`  
LFW 의 경로는 `content/dataset/LFW`  
CelebA_starGAN 의 경로는 `content/dataset/CelebA_starGAN

```
def makeCSV(path, label, tag):
    path = pathlib.PosixPath(path)
    generator = path.glob("./*")
    nullList = list()
    fileList = list()

    i = 0
    while True:
        i += 1
        try:
            filepath = generator.__next__()
            if os.stat(filepath).st_size == 0:
                nullList.append(filepath)
            else:
                fileList.append(filepath)
        except:
            break
        if i % 1000 == 0:
            clear_output()
            print(i)
    csv = pd.DataFrame({
        'filepath': fileList,
        'label': label,
        'tag': tag
    })

    return csv, nullList



```

이런 느낌의 코드로 csv 파일을 만드는 코드를 만들자

그리고 배치로 학습하는 방법을 오늘 내로 적용해야함
