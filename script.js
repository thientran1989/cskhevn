// 1. Khai báo URL ứng dụng
const androidUrl = "https://play.google.com/store/apps/details?id=com.evn.cskh.vn";
const iosUrl = "https://apps.apple.com/vn/app/evn-cskh/id6754793134";

// 2. Chèn trực tiếp URL vào thuộc tính href của các nút bấm trong HTML
document.getElementById("androidBtn").href = androidUrl;
document.getElementById("iosBtn").href = iosUrl;

// 3. Khởi tạo mã QR bằng thư viện QRCode
new QRCode("qrAndroid", { text: androidUrl, width: 170, height: 170 });
new QRCode("qrIOS", { text: iosUrl, width: 170, height: 170 });

// 4. Nhận diện Hệ điều hành & Thay đổi giao diện lập tức
const ua = navigator.userAgent;
const statusTxt = document.getElementById("status");
const boxAndroid = document.getElementById("boxAndroid");
const boxIOS = document.getElementById("boxIOS");

let targetUrl = null;
let osLabel = "";

if (/android/i.test(ua)) {
    osLabel = "Bạn đang dùng thiết bị: Android";
    if (boxIOS) boxIOS.style.display = "none"; // Ẩn ngay ô iOS
    targetUrl = androidUrl;
} else if (/iPhone|iPad|iPod/i.test(ua)) {
    osLabel = "Bạn đang dùng thiết bị: iPhone / iPad (iOS)";
    if (boxAndroid) boxAndroid.style.display = "none"; // Ẩn ngay ô Android
    targetUrl = iosUrl;
} else {
    osLabel = "Thiết bị: Máy tính hoặc Hệ điều hành khác";
    // Nếu là thiết bị khác, hiện sẵn cả 2 box QR để quét luôn
    document.getElementById("manual").style.display = "block";
}

// Cập nhật ngay trạng thái kèm tên hệ điều hành (vòng xoay loader vẫn chạy song song)
statusTxt.innerHTML = `${osLabel}<br><small style="color: #666;">Đang xử lý chuyển hướng...</small>`;

// 5. Sau 0.8 giây: Thử tự động chuyển hướng nếu có link đích
setTimeout(() => {
    if (targetUrl) {
        statusTxt.innerHTML = `${osLabel}<br><span style="color: #0056B3; font-weight: bold;">Đang mở cửa hàng ứng dụng...</span>`;
        window.location.href = targetUrl;
    }
}, 800);

// 6. Sau 3 giây (Kế hoạch dự phòng): Nếu không chuyển hướng được, bung lại toàn bộ thông tin
setTimeout(() => {
    // Ẩn vòng xoay loading đi
    const loader = document.querySelector(".loader");
    if (loader) loader.style.display = "none";

    // Hiện đầy đủ 2 khối QR và vùng nút bấm
    document.getElementById("manual").style.display = "block";
    if (boxAndroid) boxAndroid.style.display = "block";
    if (boxIOS) boxIOS.style.display = "block";

    // Cập nhật câu thông báo cuối cùng
    statusTxt.innerHTML = `<span style="color: #d9534f; font-weight: bold;">Không thể tự chuyển hướng tự động.</span><br>Vui lòng chọn hoặc quét mã QR tương ứng bên dưới.`;
}, 3000);
