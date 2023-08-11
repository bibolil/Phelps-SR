FROM ubuntu:22.04

# Update package lists and install necessary dependencies
RUN apt-get update -y && \
    apt-get install -y python3.10 python3-pip 

RUN apt-get install ffmpeg libsm6 libxext6  -y

# Set the default Python version to be used
RUN update-alternatives --install /usr/bin/python python /usr/bin/python3.10 1

# Update pip to the latest version
RUN python -m pip install --upgrade pip

WORKDIR /app
COPY . /app

RUN pip --no-cache-dir install -r requirements.txt
EXPOSE 5000

ENTRYPOINT ["python3"]
CMD ["flaskapp.py"]

