import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://rsqhbaimdnmcbaiaxaxe.supabase.co";
const supabaseKey = "sb_publishable_MCM2rfldeNbAElvO5dHWRg_kErAhrlE";
const supabase = createClient(supabaseUrl, supabaseKey);

document.getElementById("bookingForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const car = document.getElementById("car").value;

  const { error } = await supabase
    .from("bookings")
    .insert([{ name, car }]);

  if (error) {
    alert("บันทึกไม่สำเร็จ");
  } else {
    alert("จองสำเร็จ");
  }
});

