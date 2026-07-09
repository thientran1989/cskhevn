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
const statusSection = document.querySelector(".status-section");
const deviceLabel = document.getElementById("device-label");
const boxAndroid = document.getElementById("boxAndroid");
const boxIOS = document.getElementById("boxIOS");

let targetUrl = null;
let osLabel = "";

if (/android/i.test(ua)) {
    osLabel = "Bạn đang dùng hệ điều hành: Android";
    if (boxIOS) boxIOS.style.display = "none"; // Ẩn ngay ô iOS
    targetUrl = androidUrl;
} else if (/iPhone|iPad|iPod/i.test(ua)) {
    osLabel = "Bạn đang dùng hệ điều hành: iPhone / iPad (iOS)";
    if (boxAndroid) boxAndroid.style.display = "none"; // Ẩn ngay ô Android
    targetUrl = iosUrl;
} else {
    osLabel = "Bạn đang dùng thiết bị: Máy tính hoặc Hệ điều hành khác";
    // Nếu là thiết bị khác, hiện sẵn cả 2 box QR để quét luôn
    document.getElementById("manual").style.display = "block";
}

// Thực hiện yêu cầu của bạn: Ẩn status-section và Hiện nhãn thiết bị lên
if (statusSection) statusSection.style.display = "none";
if (deviceLabel) {
    deviceLabel.innerText = osLabel;
    deviceLabel.style.display = "block"; // Đảm bảo nhãn được hiển thị
}

// 5. Sau 0.8 giây: Thử tự động chuyển hướng nếu xác định được thiết bị di động
setTimeout(() => {
    if (targetUrl) {
        window.location.href = targetUrl;
    }
}, 800);

// 6. Sau 3 giây (Kế hoạch dự phòng): Nếu không tự chuyển hướng được, hiển thị lại toàn bộ
setTimeout(() => {
    // Cập nhật lại nhãn thông báo lỗi để người dùng biết tự bấm hoặc quét QR
    if (deviceLabel) {
        deviceLabel.innerHTML = `${osLabel}<br><span style="color: #d9534f; font-size: 14px;">Không thể tự động chuyển hướng. Vui lòng chọn hoặc quét mã QR bên dưới:</span>`;
    }

    // Hiện đầy đủ vùng chỉnh tay và ép hiện lại cả 2 ô QR để tùy chọn
    document.getElementById("manual").style.display = "block";
    if (boxAndroid) boxAndroid.style.display = "block";
    if (boxIOS) boxIOS.style.display = "block";
}, 3000);
