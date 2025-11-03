document.addEventListener("DOMContentLoaded", function () {
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
  const ctx = canvas.getContext("2d");

  let photoState = null;

  // Canvas layout
  const Layout = {
    width: 1200,
    height: 1800,
    margin: 100,
    scale: 1.0,
    accentHeight: 216,

    contentTop: 100,
    contentBottom: 1800 - 100,
    accentTop: 1800 - 216,

    nameY: 1640,
  };
  Layout.titleY = Layout.nameY + 56;
  Layout.contactY = Layout.titleY + 56;

  // Define the photo frame ONCE and reuse it
  Layout.photoFrame = {
    x: Layout.margin,
    y: Layout.margin,
    w: Layout.width - Layout.margin * 2,
    h: Layout.accentTop - Layout.margin, // from margin down to top of accent bar
  };

  canvas.width = Layout.width;
  canvas.height = Layout.height;

  const formState = {
    firstName: "",
    lastName: "",
    jobTitle: "",
    phoneNumber: "",
    emailAddress: "",
    accentColor: "#41d9dc",
    photo: null,
  };

  function initfromInputs() {
    formState.firstName = fnameInput.value.trim();
    formState.lastName = lnameInput.value.trim();
    formState.jobTitle = jtitleInput.value.trim();
    formState.phoneNumber = phoneInput.value.trim();
    formState.emailAddress = emailInput.value.trim();
    formState.accentColor = (ibarcolor.value || "#41d9dc").trim();
  }

  applytext.addEventListener("click", () => {
    initfromInputs();
    render();
  });

  function handleImageChange(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;

    const url = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      const { w, h } = Layout.photoFrame;

      // baseScale makes the image "cover" the frame
      const baseScale = Math.max(w / img.naturalWidth, h / img.naturalHeight);

      // start centered with cover scale; allow zoom/pan later
      photoState = {
        img,
        baseScale,
        scale: 1, // 1 * baseScale = cover
        minScale: 0.5,
        maxScale: 3,
        offsetX: 0,
        offsetY: 0,
      };

      URL.revokeObjectURL(url);
      render();
    };

    img.onerror = () => URL.revokeObjectURL(url);
    img.src = url;
  }

  function computeDrawRect() {
    if (!photoState) return null;
    const { x, y, w, h } = Layout.photoFrame;

    const currentScale = photoState.baseScale * photoState.scale;
    const drawW = photoState.img.naturalWidth * currentScale;
    const drawH = photoState.img.naturalHeight * currentScale;

    // Clamp panning so there are no gaps
    const maxOffsetX = Math.max(0, (drawW - w) / 2);
    const maxOffsetY = Math.max(0, (drawH - h) / 2);
    photoState.offsetX = Math.min(maxOffsetX, Math.max(-maxOffsetX, photoState.offsetX));
    photoState.offsetY = Math.min(maxOffsetY, Math.max(-maxOffsetY, photoState.offsetY));

    const drawX = x + (w - drawW) / 2 + photoState.offsetX;
    const drawY = y + (h - drawH) / 2 + photoState.offsetY;

    return { drawX, drawY, drawW, drawH };
  }

  // Wire both inputs to the same handler
  photoInput.addEventListener("change", handleImageChange);
  cphotoInput.addEventListener("change", handleImageChange);

  downloadphoto.addEventListener("click", () => {
    render(); // ensure latest
    canvas.toBlob(
      (blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.download = "business-card.jpg";
        a.href = url;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      },
      "image/jpeg",
      0.95
    );
  });

  // Live listeners
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
    formState.accentColor = (ibarcolor.value || "#41d9dc").trim();
    render();
  });

  function render() {
    const f = Layout.photoFrame;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    ctx.fillStyle = "#FEDF65";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Photo frame background
    ctx.fillStyle = "#000000";
    ctx.fillRect(f.x, f.y, f.w, f.h);

    // Photo
    if (photoState) {
      const r = computeDrawRect();
      if (r) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(f.x, f.y, f.w, f.h);
        ctx.clip();
        ctx.drawImage(photoState.img, r.drawX, r.drawY, r.drawW, r.drawH);
        ctx.restore();
      }
    }

    // Accent bar
    ctx.fillStyle = formState.accentColor;
    ctx.fillRect(0, Layout.accentTop, Layout.width, Layout.accentHeight);

    // Text
    ctx.textBaseline = "alphabetic";
    ctx.textAlign = "left";
    ctx.fillStyle = "#fff";

    ctx.font = "bold 56px Arial";
    ctx.fillText(`${formState.firstName} ${formState.lastName}`, Layout.margin, Layout.nameY);

    ctx.font = "normal 26px Arial";
    ctx.fillText(`${formState.jobTitle}`, Layout.margin, Layout.titleY);
    ctx.fillText(`${formState.phoneNumber} ${formState.emailAddress}`, Layout.margin, Layout.contactY);
  }

  // First paint
  initfromInputs();
  render();
});
