from demucs.apply import apply_model
from demucs.audio import save_audio

def separate_audio(input_audio, output_dir="output"):
    # هنا يمكنك استخدام النموذج مباشرة
    from demucs.utils import load_model
    model = load_model(name='htdemucs')
    sources = apply_model(model, input_audio, device='cuda' if torch.cuda.is_available() else 'cpu')

    # حفظ الملفات
    save_audio(sources[0], os.path.join(output_dir, "vocals.wav"), samplerate=model.samplerate)
    save_audio(sources[1], os.path.join(output_dir, "other.wav"), samplerate=model.samplerate)

    return os.path.join(output_dir, "vocals.wav"), os.path.join(output_dir, "other.wav")