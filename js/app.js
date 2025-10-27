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
        accentColor: "41d9dc",
        photo: null,
        HTMLImageElement
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
        render();
    });

    photoInput.addEventListener('change', () => {
        console.log("Photo changed", {
        });
    });

    downloadphoto.addEventListener("click", () => {
        console.log("Download clicked");
    });

    function render(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#FEDF65" //yellow background to see canvas
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#000000"
        ctx.fillRect(Layout.margin, Layout.margin, Layout.width - Layout.margin * 2,  Layout.accentTop - Layout.margin);
        ctx.fillStyle = ibarcolor.value //accent
        ctx.fillRect(0, Layout.accentTop, Layout.width, Layout.accentHeight);
        ctx.font = "bold 56px Arial"
        ctx.textBaseline = 'alphabetic';
        ctx.textAlign = 'left';
        ctx.fillStyle = '#fff';
        ctx.fillText(`${fnameInput.value} ${lnameInput.value}`, Layout.margin, Layout.nameY);
        ctx.font = "normal 26px Arial"
        ctx.fillText(`${jtitleInput.value}`, Layout.margin, Layout.titleY);
        ctx.fillText(`${phoneInput.value} ${emailInput.value}`, Layout.margin, Layout.contactY);
    }

});