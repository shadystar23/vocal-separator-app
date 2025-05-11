# main.py
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
import os
import uuid
from demucs.utils import apply_model

app = FastAPI()

@app.post("/process")
async def process_audio(file: UploadFile = File(...)):
    # حفظ الملف مؤقتًا
    temp_path = f"temp/{uuid.uuid4()}_{file.filename}"
    with open(temp_path, "wb") as buffer:
        buffer.write(await file.read())

    # معالجة الصوت باستخدام Demucs
    output_dir = "output"
    apply_model(input_audio=temp_path, output_dir=output_dir)

    # افتراضيًا، Demucs سيخرج الملفات في مجلد "output"
    vocals_path = os.path.join(output_dir, "vocals.wav")
    music_path = os.path.join(output_dir, "other.wav")

    # رفع الملفات إلى Firebase والحصول على الروابط
    vocals_url = upload_to_firebase(vocals_path)
    music_url = upload_to_firebase(music_path)

    return JSONResponse({
        "vocals": vocals_url,
        "music": music_url
    })