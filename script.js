// 1. Khai báo URL ứng dụng
const androidUrl = "https://play.google.com/store/apps/details?id=com.evn.cskh.vn";
const iosUrl = "https://apps.apple.com/vn/app/evn-cskh/id6754793134";

// 2. Chèn trực tiếp URL vào thuộc tính href của các nút bấm trong HTML
document.getElementById("androidBtn").href = androidUrl;
document.getElementById("iosBtn").href = iosUrl;

// 3. Khởi tạo mã QR bằng thư viện QRCode
new QRCode("qrAndroid", { text: androidUrl, width: 170, height: 170 });
new QRCode("qrIOS", { text: iosUrl, width: 170, height: 170 });

// 4. Nhận diện Hệ điều hành & Điều khiển giao diện ban đầu
const ua = navigator.userAgent;
const statusTxt = document.getElementById("status");
const deviceLabel = document.getElementById("device-label");

// Lấy các Box chứa QR để ẩn/hiện linh hoạt
// (Lưu ý: Bạn nhớ thêm id="boxAndroid" và id="boxIOS" vào thẻ bao bọc mỗi hệ điều hành như đoạn HTML bên dưới nhé)
const boxAndroid = document.getElementById("boxAndroid");
const boxIOS = document.getElementById("boxIOS");

let targetUrl = null;

if (/android/i.test(ua)) {
    if (deviceLabel) deviceLabel.innerText = "Hệ điều hành nhận diện: Android";
    if (boxIOS) boxIOS.style.style.display = "none"; // Ẩn bớt iOS
    targetUrl = androidUrl;
} else if (/iPhone|iPad|iPod/i.test(ua)) {
    if (deviceLabel) deviceLabel.innerText = "Hệ điều hành nhận diện: iPhone / iPad (iOS)";
    if (boxAndroid) boxAndroid.style.display = "none"; // Ẩn bớt Android
    targetUrl = iosUrl;
} else {
    if (deviceLabel) deviceLabel.innerText = "Hệ điều hành nhận diện: Máy tính / Khác";
    // Nếu là thiết bị khác, hiển thị sẵn cả 2 box để người dùng quét QR luôn
    document.getElementById("manual").style.display = "block";
}

// 5. Sau 0.8 giây: Thử tự động chuyển hướng nếu xác định được thiết bị
setTimeout(() => {
    if (targetUrl) {
        statusTxt.innerHTML = "Đang tự động chuyển hướng đến cửa hàng ứng dụng...";
        window.location.href = targetUrl;
    }
}, 800);

// 6. Sau 3 giây (Kế hoạch dự phòng): Nếu người dùng vẫn ở lại trang, mở toàn bộ giao diện
setTimeout(() => {
    // Ẩn vòng xoay loading đi
    const loader = document.querySelector(".loader");
    if (loader) loader.style.display = "none";

    // Cập nhật lại thông báo cho người dùng
    statusTxt.innerHTML = "Không thể tự chuyển hướng.<br>Vui lòng chọn hoặc quét mã QR bên dưới.";

    // Hiển thị lại toàn bộ vùng manual và ép hiện lại cả 2 ô QR để tùy chọn
    document.getElementById("manual").style.display = "block";
    if (boxAndroid) boxAndroid.style.display = "block";
    if (boxIOS) boxIOS.style.display = "block";
}, 3000);
