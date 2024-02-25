let saldo = 0;

const tambahSaldo = function () {
  input = window.prompt("Berapa jumlah yang ingin kamu simpan?");
  saldo += parseInt(input);
  window.alert("Saldo berhasil ditambah!")
  document.querySelector(".saldo").textContent = "Rp"+Intl.NumberFormat("id-ID").format(saldo);
};

const kurangiSaldo = function () {
  input = window.prompt("Berapa jumlah yang ingin kamu tarik?");
  if (saldo - input < 0) {
    window.alert("Tabungan kamu kurang!");
  } else {
    saldo -= parseInt(input);
  }
  window.alert("Saldo berhasil dikurangi!")
  document.querySelector(".saldo").textContent = "Rp"+Intl.NumberFormat("id-ID").format(saldo);
};

document.querySelector(".tambah").onclick = tambahSaldo;
document.querySelector(".kurang").onclick = kurangiSaldo;
