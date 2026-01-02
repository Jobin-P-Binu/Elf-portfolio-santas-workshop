/**
 * Easter Egg - North Star
 * Fun interactions for the curious user
 */

document.addEventListener('DOMContentLoaded', () => {
    const northStar = document.getElementById('north-star');

    if (northStar) {
        northStar.addEventListener('click', () => {
            triggerMagic();
        });

        // Add keyboard support
        northStar.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                triggerMagic();
            }
        });
    }
});

function triggerMagic() {
    const northStar = document.getElementById('north-star');

    // Simple rotation animation
    northStar.style.transition = 'transform 1s ease';
    northStar.style.transform = 'rotate(360deg) scale(1.5)';

    setTimeout(() => {
        alert("✨ You found the North Star! May your code be bug-free and your holidays bright! ✨");
        northStar.style.transform = 'rotate(0deg) scale(1)';
    }, 500);
}
