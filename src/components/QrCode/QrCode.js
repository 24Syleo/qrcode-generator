import { QRCodeSVG } from 'qrcode.react';

const QrCode = ({ url, bgColor, fgColor, size }) => {
  return (
    <QRCodeSVG 
      value={url}
      bgColor={bgColor}
      fgColor={fgColor}
      size={size}
    />
  );
};

export default QrCode;