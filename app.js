import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://rsqhbaimdnmcbaiaxaxe.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzcWhiYWltZG5tY2JhaWF4YXhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxNTQ5MjYsImV4cCI6MjA4MTczMDkyNn0.yeGykOoKE_C0P4Gw7RUVTudj2n1kXEARYuZte9EFr5E";
const supabase = createClient(supabaseUrl, supabaseKey);

const LIFF_ID = "2008709391-XJrxbtl9";

async function main() {
    try {
        await liff.init({ liffId: LIFF_ID });
        if (!liff.isLoggedIn()) {
            liff.login();
        } else {
            const profile = await liff.getProfile();
            document.getElementById("userId").value = profile.userId;
            document.getElementById("displayName").value = profile.displayName;

            // Auto-fill name if available (optional)
            // document.getElementById("name").value = profile.displayName; 
        }
    } catch (err) {
        console.error("LIFF Init failed", err);
        // Fallback for testing outside LINE
        // document.getElementById("userId").value = "test-user-id";
    }
}

main();

document.getElementById("bookingForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = document.getElementById("submitBtn");
    submitBtn.disabled = true;
    submitBtn.innerText = "กำลังจอง...";

    const bookingData = {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        car: document.getElementById("car").value,
        plate_number: document.getElementById("plate").value,
        service_type: document.getElementById("serviceType").value,
        date: document.getElementById("date").value,
        time: document.getElementById("time").value,
        user_id: document.getElementById("userId").value
    };

    console.log("Booking Data:", bookingData);

    const { error } = await supabase
        .from("bookings")
        .insert([bookingData]);

    if (error) {
        console.error("Supabase Error:", error);
        alert(`บันทึกไม่สำเร็จ: ${error.message}`);
        submitBtn.disabled = false;
        submitBtn.innerText = "ยืนยันการจอง";
    } else {
        alert("จองสำเร็จ! \nเราจะส่งแจ้งเตือนให้ทราบผ่าน LINE ก่อนถึงเวลา 1 ชั่วโมงครับ");
        liff.closeWindow();
    }
});
