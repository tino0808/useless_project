import { KozhiAnalysisResult } from './kozhiScoreEngine';

export async function generateShareCard(
  imageSrc: string,
  result: KozhiAnalysisResult
): Promise<string> {
  return new Promise((resolve, reject) => {
    const width = 1080;
    const height = 1350;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      reject(new Error('Failed to acquire canvas 2d context'));
      return;
    }

    // 1. Draw Background Gradient
    const bgGradient = ctx.createLinearGradient(0, 0, width, height);
    bgGradient.addColorStop(0, '#0f172a');
    bgGradient.addColorStop(0.5, '#1e1b4b');
    bgGradient.addColorStop(1, '#881337');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // Subtle background glowing circles
    ctx.beginPath();
    ctx.arc(width * 0.2, height * 0.15, 300, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(244, 63, 94, 0.15)';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(width * 0.85, height * 0.75, 350, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(245, 158, 11, 0.12)';
    ctx.fill();

    // 2. Draw Decorative Border Card Container
    const margin = 50;
    const cardW = width - margin * 2;
    const cardH = height - margin * 2;
    const radius = 36;

    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 30;
    ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
    ctx.strokeStyle = 'rgba(244, 63, 94, 0.4)';
    ctx.lineWidth = 4;

    ctx.beginPath();
    ctx.roundRect(margin, margin, cardW, cardH, radius);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // 3. Header Section
    ctx.textAlign = 'center';

    // App Mascot / Title
    ctx.font = '900 68px "Outfit", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('KOZHI METER 🐔', width / 2, 160);

    ctx.font = '600 28px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#fda4af';
    ctx.fillText('OFFICIAL KERALA SATIRE CERTIFICATE', width / 2, 210);

    // Line Divider
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(120, 240);
    ctx.lineTo(width - 120, 240);
    ctx.stroke();

    // Load and draw user photo
    const userImg = new Image();
    userImg.crossOrigin = 'anonymous';
    userImg.src = imageSrc;

    userImg.onload = () => {
      // 4. Draw Circular Photo Frame
      const photoSize = 340;
      const photoX = width / 2 - photoSize / 2;
      const photoY = 280;

      ctx.save();
      ctx.beginPath();
      ctx.arc(width / 2, photoY + photoSize / 2, photoSize / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();

      // Draw photo centered and cropped
      const aspect = userImg.width / userImg.height;
      let drawW = photoSize;
      let drawH = photoSize;
      let drawX = photoX;
      let drawY = photoY;

      if (aspect > 1) {
        drawW = photoSize * aspect;
        drawX = photoX - (drawW - photoSize) / 2;
      } else {
        drawH = photoSize / aspect;
        drawY = photoY - (drawH - photoSize) / 2;
      }

      ctx.drawImage(userImg, drawX, drawY, drawW, drawH);
      ctx.restore();

      // Outer Photo Glow Ring
      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.arc(width / 2, photoY + photoSize / 2, photoSize / 2 + 4, 0, Math.PI * 2);
      ctx.stroke();

      // 5. Draw Score Badge Ring
      const scoreY = 700;
      ctx.font = '900 110px "Outfit", sans-serif';
      ctx.fillStyle = '#f59e0b';
      ctx.fillText(`${result.score}%`, width / 2, scoreY);

      ctx.font = '700 32px "Outfit", sans-serif';
      ctx.fillStyle = '#fecdd3';
      ctx.fillText('KOZHI SCORE', width / 2, scoreY + 45);

      // 6. Draw Malayalam Rank Title
      ctx.save();
      const titleY = 820;

      // Title Banner Pill Background
      ctx.fillStyle = 'rgba(225, 29, 72, 0.25)';
      ctx.strokeStyle = 'rgba(244, 63, 94, 0.5)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(140, titleY - 45, width - 280, 85, 42);
      ctx.fill();
      ctx.stroke();

      ctx.font = '800 44px "Outfit", sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(result.tier.title, width / 2, titleY + 12);
      ctx.restore();

      // Malayalam Subtitle
      ctx.font = '600 28px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#fb7185';
      ctx.fillText(result.tier.malayalamTitle, width / 2, 940);

      // 7. Funny One-liner Quote
      ctx.font = 'italic 26px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#e2e8f0';
      
      // Multi-line text wrapper for long quotes
      const words = result.funnyQuote.split(' ');
      let line = '';
      let lineY = 1010;
      const maxWidth = cardW - 100;

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && n > 0) {
          ctx.fillText(line, width / 2, lineY);
          line = words[n] + ' ';
          lineY += 36;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, width / 2, lineY);

      // 8. Footer & Privacy Disclaimer
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.beginPath();
      ctx.moveTo(120, 1180);
      ctx.lineTo(width - 120, 1180);
      ctx.stroke();

      ctx.font = '500 20px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText('🔒 100% On-Device Privacy • No Photos Stored or Uploaded', width / 2, 1220);

      ctx.font = '400 18px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#64748b';
      ctx.fillText('⚠️ Satire & Entertainment Only — Not a real personality test.', width / 2, 1250);

      // Return Data URL
      resolve(canvas.toDataURL('image/png'));
    };

    userImg.onerror = () => {
      reject(new Error('Failed to load image for share card canvas'));
    };
  });
}
