document.addEventListener("DOMContentLoaded", function () {

    fsLightboxInstances['first-lightbox'].open(0);
    fsLightboxInstances['second-lightbox'].props.onOpen = () => console.log('Lightbox open!');

    const a = document.createElement('a');
    a.setAttribute('data-fslightbox', 'gallery');
    a.setAttribute('href', 'images/2.jpg');
    document.body.appendChild(a);

    refreshFsLightbox();

})