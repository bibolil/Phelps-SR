import ultralytics
from ultralytics import YOLO
import os
import base64
import shutil
def image_to_base64(image_path):
    with open(image_path, "rb") as img_file:
        return base64.b64encode(img_file.read()).decode('utf-8')

def cropper(image_path):
    model = YOLO("yolov8n.pt")
    print("yolov8n.pt loaded")
    model.predict(image_path,save_txt=True,save=True,save_crop=True, imgsz=320, conf=0.5)
    print("model prediction done")
    rootdir = 'runs/detect/predict/crops'
    yolo_output={}
    for subdir, dirs, files in os.walk(rootdir):
        label=subdir[len(rootdir)+1:]
        cropped_images = []    
        for file in files:
            cropped_images.append(image_to_base64(os.path.join(subdir, file)))
        if(label!=''):
            yolo_output[label]=cropped_images

    shutil.rmtree("runs")
    return yolo_output

url="https://blog.jetbrains.com/wp-content/uploads/2022/01/image1-1.png"
if __name__ == '__main__':
    print(cropper(url))




    

        
        