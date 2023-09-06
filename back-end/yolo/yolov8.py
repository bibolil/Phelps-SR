import ultralytics
from ultralytics import YOLO
import cv2

def yolo_to_opencv(labels_txt_path):
    """
    Convert YOLO format bounding box coordinates to OpenCV format.
    """
    with open(labels_txt_path, 'r') as f:
        lines = f.readlines()

    # Initialize empty lists to store converted coordinates
    xmin = []
    xmax = []
    ymin = []
    ymax = []
    nb=0

    for line in lines:
        # Split the line into parts using spaces as delimiters
        parts = line.split()
        nb=nb+1
        # Extract the label ID and bounding box coordinates
        label = int(parts[0])
        x = float(parts[1])
        y = float(parts[2])
        w = float(parts[3])
        h = float(parts[4])
        print(x,y,w,h)
        # Add the coordinates to the appropriate lists
        xmin.append(x)
        xmax.append(x + w)
        ymin.append(y)
        ymax.append(y + h)

    # Return the converted coordinates
    return nb,xmin, xmax, ymin, ymax

nb,xmin, xmax, ymin, ymax = yolo_to_opencv("runs/detect/predict/labels/image_SwinIR_KqH3nWC9Y.txt")
print(xmin, xmax, ymin, ymax)
var=(xmin[0], ymin[0], xmax[0], ymax[0])


im=cv2.imread("image_SwinIR_KqH3nWC9Y.png")
cropped_img=im[ymin[0]:ymax[0],xmin[0]:xmax[0]]
cv2.imwrite('contour1.png', cropped_image)


# model = YOLO("yolov8n.pt")
# print("yolov8n.pt loaded")
# url="https://ik.imagekit.io/SR/image_SwinIR_KqH3nWC9Y.png"
# model.predict(url,save_txt=True,save=True, imgsz=320, conf=0.5)
# print("model prediction done")