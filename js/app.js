document.addEventListener("DOMContentLoaded", function(){
    const fnameInput = document.getElementById("fname");
    const lnameInput = document.getElementById("lname");
    const jtitleInput = document.getElementById("jobtitle");
    const phoneInput = document.getElementById("phone");
    const emailInput = document.getElementById("email");
    const photoInput = document.getElementById("photo");
    const cphotoInput = document.getElementById("cameraphoto");
    const ibarcolor = document.getElementById("infobarcolor");
    const applytext = document.getElementById("applytext");
    const downloadphoto = document.getElementById("download");
    const canvas = document.getElementById("card");
    const ctx = canvas.getContext('2d');
    
    let photoState = null;

    //canvas layout
    const Layout = {
        width: 1200,
        height: 1800,
        margin: 100,
        accentHeight: 216,

        contentTop: 100,
        contentBottom: 1800-100,
        accentTop: 1800 - 216,

        nameY: 1640,
    };

    const formState = {
        firstName: "",
        lastName: "",
        jobTitle: "",
        phoneNumber: "", 
        emailAddress: "",
        accentColor: "#41d9dc",
        photo: null,
    }

    function initfromInputs() {
        formState.firstName = fnameInput.value.trim();
        formState.lastName = lnameInput.value.trim();
        formState.jobTitle = jtitleInput.value.trim();
        formState.phoneNumber = phoneInput.value.trim();
        formState.emailAddress = emailInput.value.trim();
        formState.accentColor = ibarcolor.value.trim();
    }

    Layout.titleY = Layout.nameY + 56;
    Layout.contactY = Layout.titleY + 56;
    canvas.width = Layout.width;
    canvas.height = Layout.height;

    applytext.addEventListener("click", () => {
        console.log("Apply clicked", {
            fname: fnameInput.value,
            lname: lnameInput.value,
            title: jtitleInput.value
        });
        initfromInputs();
        render();
    });

    photoInput.addEventListener('change', (e) => {
        const file = e.target.files && e.target.files[0] //Check if Photo is not selected
        if(!file) return;
        if(!file.type.startsWith('image/')) return;

        const url = URL.createObjectURL(file);
        const img = new Image();

        img.onload = () => {
            const frameX = Layout.margin;
            const frameY = Layout.margin;
            const frameW = Layout.width - Layout.margin * 2;
            const frameH = Layout.accentTop - Layout.margin;

            const scale = Math.max(frameW / img.naturalWidth, frameH / img.naturalHeight);
            const drawW = img.naturalWidth * scale;
            const drawH = img.naturalHeight * scale;
            const drawX = frameX + (frameW - drawW) / 2;
            const drawY = frameY + (frameH - drawH) / 2;

            photoState = {img, drawX, drawY, drawW, drawH};

            URL.revokeObjectURL(url);
            render();
        };
        img.src = url;
    });

    downloadphoto.addEventListener("click", () => {
        console.log("Download clicked");
        render();

        canvas.toBlob((blob) => {

            const url = URL.createObjectURL(blob);
            const downloadimg = document.createElement("a");
            downloadimg.download = "business-card.jpg";
            downloadimg.href = url;
            document.body.appendChild(downloadimg);
            downloadimg.click();
            downloadimg.remove();
            URL.revokeObjectURL(url);
        }, "image/jpeg", 0.95);
    });

    /*Live Listeners*/
    fnameInput.addEventListener("input", () => {
        formState.firstName = fnameInput.value.trim();
        render();
    });

    lnameInput.addEventListener("input", () => {
        formState.lastName = lnameInput.value.trim();
        render();
    });

    jtitleInput.addEventListener("input", () => {
        formState.jobTitle = jtitleInput.value.trim();
        render();
    });

    phoneInput.addEventListener("input", () => {
        formState.phoneNumber = phoneInput.value.trim();
        render();
    });

    emailInput.addEventListener("input", () => {
        formState.emailAddress = emailInput.value.trim();
        render();
    });

    ibarcolor.addEventListener("input", () => {
        formState.accentColor = ibarcolor.value.trim();
        render();
    });
    
    function render(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#FEDF65" //yellow background to see canvas
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#000000"
        ctx.fillRect(Layout.margin, Layout.margin, Layout.width - Layout.margin * 2,  Layout.accentTop - Layout.margin);
        if (photoState) {
            ctx.save();
            ctx.beginPath();
            ctx.rect(Layout.margin, Layout.margin, Layout.width - Layout.margin * 2, Layout.accentTop - Layout.margin);
            ctx.clip();
            ctx.drawImage(photoState.img, photoState.drawX, photoState.drawY, photoState.drawW, photoState.drawH);
            ctx.restore();
        }
        ctx.fillStyle = formState.accentColor //accent
        ctx.fillRect(0, Layout.accentTop, Layout.width, Layout.accentHeight);
        ctx.font = "bold 56px Arial"
        ctx.textBaseline = 'alphabetic';
        ctx.textAlign = 'left';
        ctx.fillStyle = '#fff';
        ctx.fillText(`${formState.firstName} ${formState.lastName}`, Layout.margin, Layout.nameY);
        ctx.font = "normal 26px Arial"
        ctx.fillText(`${formState.jobTitle}`, Layout.margin, Layout.titleY);
        ctx.fillText(`${formState.phoneNumber} ${formState.emailAddress}`, Layout.margin, Layout.contactY);
    }

    initfromInputs();
    render();
});