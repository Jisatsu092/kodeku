const btnPlay = document.querySelector('#button .mulai');
const messege1 = document.querySelector('.messege-box1');
const messege2 = document.querySelector('.messege-box2');
const messege2P = document.querySelector('.messege-box2 .pesan p');
const hilang1 = document.querySelector('.hilang1');
const hilang2 = document.querySelector('.hilang2');
const nama = document.querySelectorAll('.nama h2')[0];
const nama1 = document.querySelectorAll('.nama h2')[1];
const waktu = document.getElementById('waktu');
const jam = waktu.querySelector('h1');
const hari = waktu.querySelector('p');
const body = document.querySelector('.body');
const audio = document.querySelector('.audio');

// Set initial background
body.classList.add('background1');

// Get current date and time
const date = new Date();
const hour = String(date.getHours()).padStart(2, '0');
const minutes = String(date.getMinutes()).padStart(2, '0');

// Use existing waktuIndo.js functions if available
try {
    const day = date.getDay();
    const month = date.getMonth();
    hari.innerHTML = `${dayID()}, ${date.getDate()} ${monthID()} ${date.getFullYear()}`;
} catch (e) {
    // Fallback if waktuIndo.js not found
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
                   'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    hari.innerHTML = `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

jam.innerHTML = `${hour}:${minutes}`;

// Configuration
const pengirim = "Sayangku";
const nomorWa = "628996366033";
const textWa = "Waktunya Teka Teki Cinta!";
const TANGGAL_BENAR = "05/05/2024";

// Set sender name
if (pengirim) {
    nama.innerHTML = pengirim;
    nama1.innerHTML = pengirim;
} else {
    nama.innerHTML = "Sayangku";
    nama1.innerHTML = "Sayangku";
}

// Function to calculate relationship duration
function calculateDuration(tanggalJadian) {
    const parts = tanggalJadian.split('/');
    const startDate = new Date(parts[2], parts[1] - 1, parts[0]);
    const today = new Date();
    
    let years = today.getFullYear() - startDate.getFullYear();
    let months = today.getMonth() - startDate.getMonth();
    let days = today.getDate() - startDate.getDate();
    
    if (days < 0) {
        months--;
        const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += prevMonth.getDate();
    }
    
    if (months < 0) {
        years--;
        months += 12;
    }
    
    return { years, months, days };
}

// Format duration text
function formatDuration(years, months, days) {
    let result = [];
    if (years > 0) result.push(`${years} tahun`);
    if (months > 0) result.push(`${months} bulan`);
    if (days > 0) result.push(`${days} hari`);
    return result.join(' ');
}

// Function to show angry message
function showAngryMessage(attempts, callback) {
    const angryMessages = [
        "EH JANGAN BOHONG DONG! Tanggal jadian kita itu 05/05/2024! Masukkan yang bener!",
        "SERIUS NIH?! Udah lupa tanggal jadian kita? Coba inget-inget lagi!",
        "AKU SEDIH NIH KALO SAMPAI LUPA... Tanggalnya 05/05/2024 ya sayang!",
        "TERAKHIR KALI NIH PERINGATAN! 05/05/2024! JANGAN SAMPAI LUPA LAGI!"
    ];
    
    const messageIndex = Math.min(attempts - 1, angryMessages.length - 1);
    
    Swal.fire({
        title: 'SALAH! 😠',
        text: angryMessages[messageIndex],
        icon: 'error',
        confirmButtonText: 'Coba Lagi',
        confirmButtonColor: '#ff4757',
        background: '#ff6b6b',
        color: 'white',
        customClass: {
            popup: 'marah-popup'
        },
        allowOutsideClick: false
    }).then((result) => {
        if (result.isConfirmed) {
            callback();
        }
    });
}

// Function untuk menampilkan form input nama dan tanggal
function showInputForm() {
    Swal.fire({
        title: 'Halo! ❤️',
        html: `
            <div style="text-align: left; margin-bottom: 15px; color: #555;">
                Masukkan nama kamu dan tanggal jadian kita ya...
            </div>
            <input type="text" id="namaInput" class="swal2-input" placeholder="Nama Kamu">
            <input type="text" id="tanggalInput" class="swal2-input" placeholder="Tanggal Jadian (DD/MM/YYYY)">
            <div class="date-note">Contoh: 05/05/2024</div>
        `,
        imageUrl: "assets/img/stiker_mylove.gif",
        imageWidth: 100,
        imageHeight: 100,
        imageAlt: "Love Sticker",
        showCancelButton: false,
        confirmButtonText: 'Kirim',
        confirmButtonColor: '#25D366',
        focusConfirm: false,
        allowOutsideClick: false,
        preConfirm: () => {
            const namaValue = document.getElementById('namaInput').value;
            const tanggalValue = document.getElementById('tanggalInput').value;
            
            if (!namaValue || !namaValue.trim()) {
                Swal.showValidationMessage('Masukkan nama kamu dong!');
                return false;
            }
            
            if (!tanggalValue || !tanggalValue.trim()) {
                Swal.showValidationMessage('Tanggal jadian jangan lupa!');
                return false;
            }
            
            // Validate date format
            const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
            if (!dateRegex.test(tanggalValue)) {
                Swal.showValidationMessage('Format tanggal harus DD/MM/YYYY');
                return false;
            }
            
            // Check if date is valid
            const parts = tanggalValue.split('/');
            const day = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10);
            const year = parseInt(parts[2], 10);
            
            if (day < 1 || day > 31 || month < 1 || month > 12 || year < 2000 || year > 2100) {
                Swal.showValidationMessage('Tanggal tidak valid');
                return false;
            }
            
            return { nama: namaValue.trim(), tanggal: tanggalValue };
        }
    }).then((result) => {
        if (result.isConfirmed && result.value) {
            const namaValue = result.value.nama;
            const tanggalValue = result.value.tanggal;
            
            // Check specific date
            if (tanggalValue !== TANGGAL_BENAR) {
                salahCount++;
                showAngryMessage(salahCount, showInputForm);
                return;
            }
            
            // Calculate relationship duration
            const duration = calculateDuration(tanggalValue);
            const durationText = formatDuration(duration.years, duration.months, duration.days);
            
            // Create message
            const message = `Halo ${namaValue}... Ternyata kita sudah bersama sejak ${tanggalValue}. Sudah ${durationText} kita bersama. Terima kasih telah menjadi bagian terindah dalam hidupku, terima kasih telah memberiku kebahagiaan yang tak ternilai, terima kasih untuk semua kenangan indah yang kita buat bersama. Aku bersyukur memilikimu setiap hari. Kamu adalah anugerah terindah dalam hidupku. Mari kita lanjutkan perjalanan indah ini bersama-sama. Aku mencintaimu lebih dari kata-kata bisa ungkapkan. ❤️`;
            
            // Typewriter effect
            let i = 0;
            const typingSpeed = 30;
            
            function typeWriter() {
                if (i < message.length) {
                    messege2P.textContent += message.charAt(i);
                    i++;
                    setTimeout(typeWriter, typingSpeed);
                } else {
                    // After finishing typing, show the reply button
                    messege2.classList.add('kelip');
                    body.classList.replace('background1', 'background2');
                    body.classList.add('muncul');
                    hilang2.style.display = "block";
                }
            }
            
            // Clear existing text and start typing
            messege2P.textContent = '';
            typeWriter();
        }
    });
}

// Variable untuk menyimpan jumlah percobaan salah
let salahCount = 0;

// Start button click event
btnPlay.addEventListener('click', () => {
    // Try to play audio
    audio.play().catch(e => console.log("Audio play error:", e));
    
    // Show first message
    messege1.style.display = "block";
    messege1.style.transform = "translateX(0)";
    btnPlay.style.display = "none";
    hilang1.style.display = "block";
});

// First message click event
hilang1.addEventListener('click', () => {
    // Hide first message, show second
    messege1.style.display = "none";
    messege2.style.transform = "translateX(0)";
    hilang1.style.display = "none";
    
    // Reset salah count
    salahCount = 0;
    
    // Show the input form
    showInputForm();
});

// Reply button click event - DENGAN TEKA-TEKI
hilang2.addEventListener('click', () => {
    Swal.fire({
        title: '💕 Mau Main Teka-Teki? 💕',
        text: 'Aku udah siapin teka-teki cinta buat kamu! Mau main?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Iya, Mau! 😊',
        cancelButtonText: 'Nggak Mau 😔',
        confirmButtonColor: '#25D366',
        cancelButtonColor: '#ff4757',
        allowOutsideClick: false,
        customClass: {
            popup: 'teka-teki-popup'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            // Kalau mau main, buka WhatsApp
            const encodedMessage = encodeURIComponent(textWa);
            window.open(`https://wa.me/${nomorWa}/?text=${encodedMessage}`, '_blank');
            
            Swal.fire({
                title: 'Yeay! 🎉',
                text: 'Teka teki cinta sudah dikirim ke WhatsApp! Ayo main! ❤️',
                icon: 'success',
                confirmButtonText: 'OK',
                confirmButtonColor: '#25D366'
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            // Kalau nggak mau, tampilkan pop-up kecewa
            Swal.fire({
                title: '😢 Kecewa Nih...',
                text: 'Yaah... padahal aku udah siapin teka-teki seru buat kamu. Gapapa deh, nanti main ya! 💔',
                icon: 'error',
                confirmButtonText: 'Balik',
                confirmButtonColor: '#ff4757',
                customClass: {
                    popup: 'kecewa-popup'
                }
            }).then(() => {
                // Kembali ke tampilan awal (pesan 2 tetap terlihat)
                // User bisa klik tombol "Balas Pesan" lagi kalau mau
            });
        }
    });
});

// Auto-play audio on user interaction
document.addEventListener('click', function initAudio() {
    audio.play().then(() => {
        console.log('Audio playing');
    }).catch(e => {
        console.log('Audio autoplay failed:', e);
    });
    document.removeEventListener('click', initAudio);
}, { once: true });

// Ensure WhatsApp icon is properly sized
document.addEventListener('DOMContentLoaded', function() {
    const waIcons = document.querySelectorAll('.left-header img');
    waIcons.forEach(img => {
        img.style.width = '30px';
        img.style.height = '30px';
    });
});