import { motion } from "framer-motion";
import { FaCode, FaDatabase, FaCamera, FaPaintBrush, FaNetworkWired, FaChartLine, FaMoneyBillWave, FaPalette } from "react-icons/fa";

const categories = [
  { name: "Development", icon: <FaCode />, courses: 9 },
  { name: "Data Science", icon: <FaDatabase />, courses: 5 },
  { name: "Photography", icon: <FaCamera />, courses: 12 },
  { name: "Art & Design", icon: <FaPaintBrush />, courses: 4 },
  { name: "Networking", icon: <FaNetworkWired />, courses: 3 },
  { name: "Marketing", icon: <FaChartLine />, courses: 8 },
  { name: "Finance", icon: <FaMoneyBillWave />, courses: 4 },
  { name: "UI/UX Design", icon: <FaPalette />, courses: 4 },
];

const CategoriesSection = () => (
  <div className="space-y-10 my-20 container mx-auto px-12 bg-[#f7f5fa] py-10">
    <h1 className="text-5xl font-bold text-center">Explore Our Categories</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((category, index) => (
        <motion.div
          key={index}
          className="p-6 bg-white shadow-lg rounded-lg text-center cursor-pointer"
          whileHover={{ scale: 1.05 }} // Increases size on hover
          whileTap={{ scale: 0.95 }} // Slight shrink on click
        >
          <div className="text-4xl text-[#ad6cf5] mb-3 flex items-center justify-center">
            {category.icon}
          </div>
          <h2 className="text-xl font-semibold">{category.name}</h2>
          <p className="text-gray-500">{category.courses} Courses</p>
        </motion.div>
      ))}
    </div>
  </div>
);

export default CategoriesSection;
