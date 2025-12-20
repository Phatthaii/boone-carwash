import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://rsqhbaimdnmcbaiaxaxe.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzcWhiYWltZG5tY2JhaWF4YXhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxNTQ5MjYsImV4cCI6MjA4MTczMDkyNn0.yeGykOoKE_C0P4Gw7RUVTudj2n1kXEARYuZte9EFr5E";
const supabase = createClient(supabaseUrl, supabaseKey);

document.getElementById("bookingForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const car = document.getElementById("car").value;

    const { error } = await supabase
        .from("bookings")
        .insert([{ name, car }]);

    if (error) {
        console.error("Supabase Error:", error);
        alert(`บันทึกไม่สำเร็จ: ${error.message} (${error.code || 'No code'})`);
    } else {
        alert("จองสำเร็จ");
    }
});
