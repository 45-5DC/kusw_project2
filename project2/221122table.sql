drop table caption_table;

CREATE TABLE caption_table (
unnamed        NUMBER(38),
video_ID    VARCHAR2(1000),
start_ms    VARCHAR2(1000),
end_ms      VARCHAR2(1000),
timetext    VARCHAR2(1000),
captions    VARCHAR2(1000),
CONSTRAINT video_ID FOREIGN KEY (video_id) REFERENCES video_Table(video_id)
);
ALTER TABLE caption_table DROP COLUMN unnamed;

drop table video_Table;

CREATE TABLE video_Table (
unnamed        NUMBER(38),
video_id       VARCHAR2(1000) PRIMARY KEY,
video_title    VARCHAR2(1000),
channel_name   VARCHAR2(1000)
);

ALTER TABLE video_table DROP COLUMN unnamed;  

