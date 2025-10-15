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

    downloadphoto.addEventListener("click", () => {
        console.log("Download clicked");
    });

    function render(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#FEDF65" //yellow background to see canvas
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#41d9dc" //accent
        ctx.fillRect(0, Layout.accentTop, Layout.width, Layout.accentHeight);
        ctx.font = "bold 56px Arial"
        ctx.textBaseline = 'alphabetic';
        ctx.textAlign = 'left';
        ctx.fillStyle = '#fff';
        ctx.fillStyle = "#000";
        ctx.fillText(`${fnameInput.value} ${lnameInput.value}`, 100, Layout.nameY);
        ctx.font = "600 26px Arial"
        ctx.fillText(`${jtitleInput.value}`, 100, Layout.titleY);
        ctx.fillText(`${phoneInput.value} ${emailInput.value}`, 100, Layout.contactY);
    }

});