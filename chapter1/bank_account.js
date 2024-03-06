let saldo = 0;

const tambahSaldo = function () {
  input = window.prompt("Berapa jumlah yang ingin kamu simpan?");

  if(isNaN(input)){
    window.alert('Harus angka!')
    return;
  }

  if(input == 0){
    window.alert('Saldo anda tidak bertambah!')
    return;
  }
  
  saldo += parseInt(input);
  window.alert("Saldo berhasil ditambah!");
  document.querySelector(".saldo").textContent =
    "Rp" + Intl.NumberFormat("id-ID").format(saldo);
};

const kurangiSaldo = function () {
  input = window.prompt("Berapa jumlah yang ingin kamu tarik?");
  if(isNaN(input)){
    window.alert('Harus angka!')
    return;
  }
  if (saldo - input < 0) {
    window.alert("Tabungan kamu kurang!");
  } else {
    if(input == 0){
      window.alert('Saldo anda tidak berkurang!')
      return;
    }
    saldo -= parseInt(input);
    window.alert("Saldo berhasil dikurangi!");
  }
  document.querySelector(".saldo").textContent =
    "Rp" + Intl.NumberFormat("id-ID").format(saldo);
};

document.querySelector(".tambah").onclick = tambahSaldo;
document.querySelector(".kurang").onclick = kurangiSaldo;
