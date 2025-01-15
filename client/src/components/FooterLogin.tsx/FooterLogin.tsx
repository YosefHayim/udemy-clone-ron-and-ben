import React from "react";

const FooterLogin: React.FC = () => {
  return (
    <div className="flex items-center justify-between font-medium bg-[#1c1d1f] text-white  border-t border-gray-700 border-y-[#9DA3A7] pb-4 pt-2 px-12">
      {/* Texto Explicativo */}
      <div>
        <h3 className="text-lg font-bold" style={{ lineHeight: "2.2" }}>Teach the world online</h3>
        <p className="text-sm text-white">
          Create an online video course, reach students across the globe, and earn money
        </p>
      </div>

      {/* Botão */}
      <div>
        <button className="px-4 py-2 text-sm font-bold text-white border border-white rounded hover:bg-gray-700">
          Teach on Udemy
        </button>
      </div>
    </div>
  );
};

export default FooterLogin;