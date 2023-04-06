const Header = () => {
  return (
    <header className="bg-blue-100 px-[10%] py-20 w-screen relative">
      <h1 className="text-blue-700 font-bold text-[64px]">
        เรื่องบ้าน...ให้เราช่วยดูแลคุณ
      </h1>
      <h2 className="font-semibold text-[2.625rem] ">
        “สะดวก ราคาคุ้มค่า เชื่อถือได้“
      </h2>
      <p className="text-gray-700 text-2xl my-12">
        ซ่อมเครื่องใช้ไฟฟ้า ซ่อมแอร์ ทำความสะอาดบ้าน
        <br />
        โดยพนักงานแม่บ้าน และช่างมืออาชีพ
      </p>
      <button className="btn-primary">เช็คราคาบริการ</button>
      <img
        className="absolute h-[90%] bottom-0 right-[8%]"
        src="../../images/plumber-pointing-lateral_1368-587-removebg-preview 1.png"
        alt="header-image"
      />
    </header>
  );
};
export default Header;
