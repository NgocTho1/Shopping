
var mongoose=require('mongoose');
var Product=require('../model/product.js');


var products =[ new Product({
    imagePath: ['./image/pro0-1.jpg', './image/pro0-2.jpg', './image/pro0-3.jpg'],
    tittle: 'Kem trắng da Murad White Brilliance',
    tittleLink : 'kem-trang-da-murad-white-brilliance',
    cateId : '5aea73a3c8e9661a2821911e',
    description: 'Tinh chất chống lão hoá da do nội tiết Murad Intensive Age-Diffusing Serum chứa công thức hiện đại được cấp bằng sáng chế, giúp xoá nếp nhăn, làm da săn chắc, cho làn da sức sống mới tươi trẻ như tuổi thanh xuân.',
    price: 100000

}), new Product({
    imagePath: ['./image/goi-dau.jpg', './image/goi-dau1.jpg', './image/goi-dau2.jpg'],
    tittle: 'Bộ Dầu Gội - Xả Phục Hồi Tóc Farmasi Olive',
    tittleLink : 'bo-dau-goi-xa-phuc-hoi-toc-farmasi-olive',
    cateId : '5aea73a3c8e9661a2821911e',
    description: 'Bộ Gội - Xả Phục Hồi Tóc Farmasi Olive là bộ chăm sóc tóc chứa chiết xuất dầu Olive tự nhiên giàu dưỡng chất giúp bảo vệ tóc tối ưu và làm tóc bóng mượt tự nhiên. Dầu Olive được chứng minh là có thể bảo vệ tóc khỏi hư tổn bởi các tác nhân bên ngoài và tia cực tím, giúp phục hồi tế bào gốc và bảo vệ lớp bên ngoài, cho bạn 1 mái tóc thực sự chắc khỏe, mềm mại và bóng mượt.',
    price: 200000

}),new Product({
    imagePath: ['./image/ke-mat.jpg'],
    tittle: 'Kem Dưỡng Mắt Chống Lão Hóa, Nếp Nhăn Farmasi Hyacure ',
    tittleLink : 'kem-duong-mat-chong-lao-hoa-nep-nhan-farmasi-hyacure',
    cateId : '5aea73a3c8e9661a2821911e',
    description: 'Kem Dưỡng Mắt Chống Lão Hóa, Nếp Nhăn Farmasi Hyacure Age Active Eye Cream (10ml) - 1722BAS giúp tái tạo vùng da quanh mắt cho phụ nữ trên 35 tuổi. Sản phẩm được phát triển đặc biệt trong phòng thí nghiệm của Farmasi cho làn da có tuổi, giúp ngăn ngừa sự hình thành nếp nhăn mới đồng thời dưỡng ẩm sâu làm tăng tính đàn hồi của vùng da nhạy cảm quanh mắt.',
    price: 150000

}),new Product({
    imagePath: ['./image/ngua-mun.jpg'],
    tittle: 'Sữa Rửa Mặt Tạo Bọt Ngăn Ngừa Mụn Và Se Lỗ Chân Lông',
    tittleLink : 'sua-rua-mat-tao-bot-ngan-ngua-mun-va-se-lo-chan-long',
    cateId : '5aea73a3c8e9661a2821911e',
    description: 'Sữa Rửa Mặt Tạo Bọt Ngăn Ngừa Mụn Và Se Lỗ Chân Lông - Normaderm Anti-perfection Deep Cleansing Foaming Cream Vichy 125ml - 100891276 làm sạch làn da hiệu quả với thành phần chứa Acid Salycilic được biết đến với khả năng đầy lùi mụn, nhẹ nhàng làm sạch và mang đến làn da mềm mại. Dạng kem (cream) giúp sữa rửa mặt không làm khô da như các dạng sữa rửa mặt thông thường khác.',
    price: 250000

}),new Product({
    imagePath: ['./image/ives.jpg'],
    tittle: 'Sữa Rửa Mặt ST.IVES Tươi Mát Da Hương Mơ',
    tittleLink : 'sua-rua-mat-st-ives-tuoi-mat-da-huong-mo',
    cateId : '5aea73a3c8e9661a2821911e',
    description: 'Sữa Rửa Mặt ST.IVES Tươi Mát Da Hương Mơ (170g) bán chạy nhất tại Mỹ với 100% thành phần thiên nhiên nhẹ nhàng làm sạch bụi bẩn, lấy đi những tế bào chết là nguyên nhân gây ra mụn, giúp làn da mềm mịn và phục hồi, tươi mát. Sử dụng trọn bộ sản phẩm chăm sóc mặt và cơ thể Hương Mơ của St.Ives gồm Sữa rửa mặt và Sữa tắm để có hiệu quả bảo vệ, chăm sóc làn da mềm mịn, tỏa sáng.',
    price: 100000

}), new Product({
    imagePath: ['./image/etic-150.jpg'],
    tittle: 'Kem Rửa Mặt Hữu Cơ Dịu Nhẹ Lait Danesse SoBio Etic',
    tittleLink : 'kem-rua-mat-huu-co-diu-nhe-lait-d-anesse-so-bio-etic',
    cateId : '5aea73a3c8e9661a2821911e',
    description: 'Kem chứa các thành phần làm sạch không gây kích ứng cùng kết cấu kem nhẹ nhàng loại bỏ bụi bẩn, tế bào chết trên da mà không gây khô da, cho bạn làn da sạch và mịn màng.',
    price: 100000

}),new Product({
    imagePath: ['./image/duongda-op.jpg'],
    tittle: 'Kem Tẩy Da Chết Neem Cho Da Thường Đến Da Dầu Himalaya Herbals',
    tittleLink : 'kem-tay-da-che-t-neem-cho-da-thuong-de-n-da-dau-himalaya-herbals',
    cateId : '5aea73a3c8e9661a2821911e',
    description: 'ết hợp với Hột Quả Mơ nhẹ nhàng làm sạch da chết, mụn đầu đen và tạp chất, mang lại làn da mềm mại, sạch mát, tươi trẻ và láng mịn.',
    price: 100000

}), new Product({
    imagePath: ['./image/pro1-1.jpg', './image/pro1-2.jpg', './image/pro1-3.jpg'],
    tittle: 'Sữa trị nám Transino Whitening4',
    tittleLink : 'sua-tri-nam-transino-whitening4',
    cateId : '5aea73a3c8e9661a2821911e',
    description: '   Sữa dưỡng trắng da trị nám Whitening Clear Milk Transino 120ml là một sản phẩm trong bộ làm trắng trị nám Transino của hãng Sankyo Daiichi - Japan',
    price: 500000
}), new Product({
    imagePath: ['./image/pro2-1.jpg', './image/pro2-2.jpg', './image/pro2-3.jpg'],
    tittle: 'TAI NGHE CHỤP TAI SIBERIA V3 PRISM GAMING',
    tittleLink : 'tai-nghe-chup-tai-siberia-v3-prism-gaming',
    cateId : '5aea73a3c8e9661a28219120',
    description: 'Củ loa SteelSeries thế hệ mới cho âm thanh tự nhiên, âm trầm (bass) mạnh mẽ',
    price: 1000000
}), new Product({
    imagePath: ['./image/pro3-1.jpg', './image/pro3-2.jpg'],
    tittle: 'Son Màu Mịn Môi Lâu Phai L\'oreal LaVie En Rose',
    tittleLink : 'son-mau-min-moi-lau-phai-loreal-lavie-en-rose',
    cateId : '5aea73a3c8e9661a2821911f',
    description: 'Son Màu Mịn Môi Lâu Phai LaVie En Rose L\'oreal (4,2g) là bộ sưu tập những sắc màu thời trang nhất, cho bạn đôi môi luôn rực rỡ và quyến rũ. Son có khả năng giữ màu môi lâu phai và dưỡng ẩm hiệu quả với các tinh dầu quý hiếm. Kết cấu son mềm mịn và chất son mượt mà được nghiên cứu bởi viện nghiên cứu L oreal Paris giúp dễ dàng bao phủ son đều lên môi và cho màu sắc chuẩn. Chất son Matte mịn',
    price: 100000
}), new Product({
    imagePath: ['./image/pro4-1.jpg', './image/pro4-2.jpg', './image/pro4-3.jpg'],
    tittle: 'Son môi Maybelline Color Show',
    tittleLink : 'son-moi-maybelline-color-show',
    cateId : '5aea73a3c8e9661a2821911f',
    description: 'Sắc màu hoàn hảo lên màu chuẩn Sắc tố màu nguyên chất cho Son màu Color show luôn có sắc màu rực rỡ, lên màu sống động không quá bóng với độ bao phủ tuyệt đối, không lem và lâu phai trong suốt 6 giờ. Dưỡng ẩm hiệu quả Chất son đánh mịn, không gây cợn và không gây ra cảm giác khô môi thành phần tinh dầu jojoba& shea butter từ thiên nhiên, giữ ẩm sâu cho môi cảm giác mềm mượt đầy ',
    price: 200000
}), new Product({
    imagePath: ['./image/pro5-1.jpg', './image/pro5-2.jpg'],
    tittle: 'Sạt dự phòng A4000',
    tittleLink : 'sat-du-phong-a4000',
    cateId : '5aea73a3c8e9661a28219121',
    description: 'Além Desta Novidade O Game Apresenta Um Novo Modo De Câmera,Novos Recursos De Comemoração. Título: Pes 16 Plataforma: Ps4 Produtora: Konami Características: Gênero: Esporte Faixa Etária: Livre Jogadores: 1-4 Offline / 2-22 Online Idioma Jogo: Audio Em Português-Br Com Narração De Mauro Beting E Silvio Luis Idioma Manual: Português Sac: 4003-7669 Para Capitais E Regiões Metropolitanas 0800-880-7669 Demais Localidades. Nem Todos Os Recursos Estão Disponíveis Para Todas As Plataformas De Jogo.',
    price: 300000
})
];
     var done=0;
     for(var i=0;i<products.length;i++){
        
        products[i].save(function(err,result){
             done++;
             if(done===products.length){
                exit()
            };
        });
       
     };
    function exit(){
         mongoose.disconnect();
     };

    

    
   

 //module.exports=Product.create(products,(err)=>{
         //if(err) throw err;
    // })
