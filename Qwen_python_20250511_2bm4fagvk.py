from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
import os
import uuid
import subprocess
import shutil
from firebase_setup import upload_to_firebase

app = FastAPI()

# مجلد لحفظ الملفات المؤقتة
TEMP_DIR = "temp"
OUTPUT_DIR = "output"

os.makedirs(TEMP_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)

@app.post("/process")
async def process_audio(file: UploadFile = File(...)):
    if not file.content_type.startswith("audio/"):
        raise HTTPException(status_code=400, detail="Invalid audio file")

    # حفظ الملف مؤقتًا
    temp_path = os.path.join(TEMP_DIR, f"{uuid.uuid4()}_{file.filename}")
    with open(temp_path, "wb") as buffer:
        buffer.write(await file.read())

    # تشغيل demucs
    try:
        subprocess.run([
            "demucs",
            "--out", OUTPUT_DIR,
            temp_path
        ], check=True)

        # افتراض أن اسم الملف بعد المعالجة سيكون vocals.wav وother.wav
        track_name = os.path.splitext(file.filename)[0]
        vocals_path = os.path.join(OUTPUT_DIR, "htdemucs", os.path.basename(temp_path), "vocals.wav")
        music_path = os.path.join(OUTPUT_DIR, "htdemucs", os.path.basename(temp_path), "other.wav")

        if not os.path.exists(vocals_path) or not os.path.exists(music_path):
            raise Exception("Demucs failed to separate tracks.")

        # رفع إلى Firebase والحصول على الروابط
        vocals_url = upload_to_firebase(vocals_path)
        music_url = upload_to_firebase(music_path)

        return JSONResponse({
            "vocals": vocals_url,
            "music": music_url
        })

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        # تنظيف الملفات المؤقتة
        if os.path.exists(temp_path):
            os.remove(temp_path)
        if os.path.exists(os.path.dirname(vocals_path)):
            shutil.rmtree(os.path.dirname(vocals_path))