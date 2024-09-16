import { useRef, useState, useEffect } from 'react';
import { QrCode, InputField } from '../index';
import "./QrForm.css";

const QrForm = () => {

    const [formData, setFormData] = useState({
        url: "",
        fgColor: "#000000",  // Couleur par défaut
    });
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const formRef = useRef();

    const handleUrl = (evt) => {
        setFormData(
            { url: evt.target.value, fgColor: formData.fgColor }
        )
    };

    const handleFgColor = (evt) => {
        setFormData(
            { url: formData.url, fgColor: evt.target.value }
        )
    };

    const handleQrCode = (evt) => {
        evt.preventDefault();
        console.log("works");


        const svgEl = formRef.current.querySelector('svg');
        if (svgEl) {
            const svgData = new XMLSerializer().serializeToString(svgEl);
            const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
            const svgUrl = URL.createObjectURL(svgBlob);
            const downloadLink = document.createElement('a');
            downloadLink.href = svgUrl;
            downloadLink.download = 'qrcode.svg';
            downloadLink.click();
        }
    };

    // Utilisation de useEffect pour gérer l'état du bouton
    useEffect(() => {
        if (formData.url && formData.fgColor) {
            setIsButtonDisabled(false);  // Activer le bouton si les deux valeurs sont présentes
        } else {
            setIsButtonDisabled(true);  // Désactiver sinon
        }
    }, [formData.url, formData.fgColor]);  // Dépendances : mettre à jour lorsque l'URL ou la couleur change

    return (
        <form onSubmit={handleQrCode} ref={formRef} className='qrForm'>
            <InputField
                type="text"
                value={formData.url}
                onChange={handleUrl}
                placeholder="URL du site ou numéro à encoder"
                name="url"
            />
            <InputField
                type="color"
                value={formData.fgColor}
                onChange={handleFgColor}
                placeholder="Choisir la couleur"
                name="fgColor"
            />
            <QrCode url={formData.url} fgColor={formData.fgColor} />
            <button type="submit" disabled={isButtonDisabled} className={`btn ${isButtonDisabled ? 'notActive' : ''}`}>Télécharger</button>
        </form>
    );
};

export default QrForm;
