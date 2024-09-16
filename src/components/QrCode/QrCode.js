import { QRCodeSVG } from 'qrcode.react';

const QrCode = ({ url, fgColor }) => {
  return (
    <QRCodeSVG 
      value={url}
      fgColor={fgColor}
    />
  );
};

export default QrCode;