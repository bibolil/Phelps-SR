import ultralytics
from ultralytics import YOLO

model = YOLO("yolov8n.pt")
print("yolov8n.pt loaded")
url="https://blog.jetbrains.com/wp-content/uploads/2022/01/image1-1.png"
model.predict(url,save_txt=True,save=True,save_crop=True, imgsz=320, conf=0.5)
print("model prediction done")