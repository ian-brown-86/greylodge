let intro = document.querySelector('.intro');
let logo = document.querySelector('.logo-header');
let logoSpan = document.querySelector('.logo');

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        logoSpan.forEach((span, idx) => {
            setTimeout(() => {
                span.classlist.add('active');
            }, (idx + 1) * 400);
        });
        setTimeout(() => {
            logoSpan.forEach((span, idx) => {
                setTimeout(() => {
                    span.classlist.remove('active');
                    span.classlist.add('fade');
                }, (idx + 1) * 50);
            });
        }, 2000);
    });
});