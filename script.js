document.addEventListener("DOMContentLoaded", function() {
    // Mảng các tên đầy đủ của nhân vật anime
    const animeNames = [
      "Edogawa Conan",
      "Uzumaki Naruto",
      "Son Goku",
      "Monkey D. Luffy",
      "Saitama",
      "Kurosaki Ichigo"
    ];
  
    // Trích xuất phần tên (lấy từ cuối chuỗi, chuyển thành chữ in hoa)
    const words = animeNames.map(name => {
      const parts = name.trim().split(" ");
      return parts[parts.length - 1].toUpperCase();
    });
    
    // Kích thước lưới (15x15)
    const gridSize = 15;
    
    // Tạo lưới rỗng (2D array) với các ô ban đầu là chuỗi rỗng
    let grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(""));
  
    // Hàm kiểm tra xem một từ có thể đặt được tại vị trí (row, col) theo chiều ngang không
    function canPlaceWordAt(row, col, word) {
      if (col + word.length > gridSize) return false; // Từ vượt quá giới hạn lưới
      for (let i = 0; i < word.length; i++) {
        // Nếu ô không rỗng và chữ hiện tại khác với chữ cần đặt, không thể đặt
        if (grid[row][col + i] !== "" && grid[row][col + i] !== word[i]) {
          return false;
        }
      }
      return true;
    }
  
    // Đặt từng từ vào lưới theo chiều ngang tại vị trí ngẫu nhiên
    words.forEach(word => {
      let placed = false;
      // Thử đặt từ tối đa 100 lần để tránh vòng lặp vô hạn
      for (let attempt = 0; attempt < 100; attempt++) {
        const row = Math.floor(Math.random() * gridSize);
        const maxStart = gridSize - word.length;
        const col = Math.floor(Math.random() * (maxStart + 1));
        if (canPlaceWordAt(row, col, word)) {
          // Đặt từ vào lưới
          for (let i = 0; i < word.length; i++) {
            grid[row][col + i] = word[i];
          }
          placed = true;
          break;
        }
      }
      if (!placed) {
        console.log("Không thể đặt từ:", word);
      }
    });
  
    // Render lưới ra dưới dạng bảng HTML trong phần tử có id "crossword"
    const crosswordDiv = document.getElementById("crossword");
    const table = document.createElement("table");
    table.style.margin = "0 auto";
    table.style.borderCollapse = "collapse";
  
    for (let i = 0; i < gridSize; i++) {
      const tr = document.createElement("tr");
      for (let j = 0; j < gridSize; j++) {
        const td = document.createElement("td");
        td.style.width = "30px";
        td.style.height = "30px";
        td.style.border = "1px solid #ccc";
        td.style.textAlign = "center";
        td.style.verticalAlign = "middle";
        td.style.fontWeight = "bold";
        td.textContent = grid[i][j];
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
  
    crosswordDiv.appendChild(table);
  });
  