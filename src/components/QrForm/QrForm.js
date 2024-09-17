import { useRef, useState, useEffect } from 'react';
import { QrCode, InputField } from '../index';
import "./QrForm.css";

const QrForm = () => {

    const [formData, setFormData] = useState({
        url: "",
        bgColor: "#ffffff",
        fgColor: "#000000",
        size: "128",
    });
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const formRef = useRef();

    const handleUrl = (evt) => {
        setFormData(
            { 
                url: evt.target.value,
                bgColor: formData.bgColor,
                fgColor: formData.fgColor, 
                size: formData.size,
            }
        )
    };

    const handleBgColor = (evt) => {
        setFormData(
            { 
                url: formData.url,
                bgColor: evt.target.value,
                fgColor: formData.fgColor,
                size: formData.size,
            }
        )
    };

    const handleFgColor = (evt) => {
        setFormData(
            { 
                url: formData.url,
                bgColor: formData.bgColor,
                fgColor: evt.target.value,
                size: formData.size,
            }
        )
    };

    const handleSize = (evt) => {
        setFormData(
            { 
                url: formData.url,
                bgColor: formData.bgColor,
                fgColor: formData.fgColor,
                size: evt.target.value,
            }
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
                value={formData.bgColor}
                onChange={handleBgColor}
                placeholder="Choisir la couleur"
                name="bgColor"
            />
            <InputField
                type="color"
                value={formData.fgColor}
                onChange={handleFgColor}
                placeholder="Choisir la couleur"
                name="fgColor"
            />
            <InputField
                type="number"
                value={formData.size}
                onChange={handleSize}
                name="size"
            />
            <QrCode url={formData.url} bgColor={formData.bgColor} fgColor={formData.fgColor} size={formData.size}/>
            <button type="submit" disabled={isButtonDisabled} className={`btn ${isButtonDisabled ? 'notActive' : ''}`}>Télécharger</button>
        </form>
    );
};

export default QrForm;
