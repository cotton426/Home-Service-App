import { FiTag } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function ServiceMore({ items, loading}) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center w-full pb-20 pt-20 bg-gray-50 h-full">
      
      {/* {loading && <div className="text-black bg-red h-60">Loading...</div>} */}
      {!items ? (
        <h1>ไม่พบบริการที่ค้นหา</h1>
      ) : (
        <div className="grid grid-cols-3 gap-10 w-[80%]">
          {items.map((item, index) => {
            return (
              <div key={index}>
                <div className="flex justify-center">
                  <div className="bg-white rounded-lg relative overflow-hidden shadow-md mt-3 mb-5 w-[90%]">
                    <div className="service-preview">
                      <img
                        src={item.image}
                        alt="service"
                        className="w-full h-[200px] object-cover"
                      />
                    </div>
                    <div className="service-detail flex flex-col justify-start items-start py-2.5 px-6">
                      <h1
                        className={`${
                          item.categories.name === "บริการห้องครัว"
                            ? "kitchen"
                            : item.categories.name === "บริการทั่วไป"
                            ? "general"
                            : item.categories.name === "บริการห้องน้ำ"
                            ? "toilet"
                            : "garden"
                        }`}
                      >
                        {item.categories.name}
                      </h1>
                      <h2 className="text-gray-950 text-xl font-bold">
                        {item.name}
                      </h2>
                      <div className="flex flex-row justify-center items-center">
                        <FiTag className="w-3.5 mr-2 text-gray-700" />
                        <span className="text-gray-700 text-sm">
                          ค่าบริการประมาณ{" "}
                          {item.sub_services.length > 1
                            ? `${Math.min(
                                ...item.sub_services.map(
                                  (sub_price) => sub_price.price
                                )
                              )} - ${Math.max(
                                ...item.sub_services.map(
                                  (sub_price) => sub_price.price
                                )
                              )} ฿`
                            : item.sub_services[0]?.price + " ฿"}
                        </span>
                      </div>
                    </div>
                    <button
                      className="btn-ghost mb-3 ml-4"
                      onClick={() => {
                        console.log(item);
                        navigate(`/select-service/${item.service_id}`);
                      }}
                    >
                      เลือกบริการ
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ServiceMore;
