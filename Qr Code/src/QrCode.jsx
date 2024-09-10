import { useState } from "react";
export const QrCode = () => {
    const [img, setImg] = useState("");
    const [loading, setLoading] = useState(false);
    const [qrData, setQrData] = useState("https://google.com/");
    const [qrSize, setQrSize] =useState("150");

    async function generateQr() {
        setLoading(true);
        try {
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
            setImg(url);
        } catch (error) {
            console.error("Error generating QR code", error);
        } finally {
            setLoading(false);
        }
    }
    function downloadQR() {
        fetch(img).then((response) => response.blob()).then((blob) => {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download="qrcode.jpg";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }).catch((error) => {
            console.error("Error downloading QR code",error);
        });
    }
  return (
    <div className="app-container">
        
        <div className="content">
        <h1>QR CODE GENERATOR</h1>
        {loading && <p>Please wait...</p>}
        {img && <img src={img} className="qr-code-image" />}
        <div>
            <label htmlFor="dataInput" className="input-label">
                Data for Qr code:
            </label>
            <input type="text" value={qrData} id="dataInput" placeholder="Enter data for QR code"
            onChange={(e) => setQrData(e.target.value)} />
            <label htmlFor="sizeInput" className="input-label">
                Image size (e.g., 150):
            </label>
            <input type="text" id="sizeInput" placeholder="Enter image size" value={qrSize}
             onChange={(e) => setQrSize(e.target.value)}  />
            <button className="generate-button" disabled={loading} onClick={generateQr}>Generate QR Code</button>
            <button className="download-button" onClick={downloadQR}>Download QR Code</button>
        </div>
        <p className="footer">
            Designed By Moses and Supported By <a href="https://www.tutorjoes.in/">Tutor Joes</a>
        </p>
        </div>
    </div>
  );
};
