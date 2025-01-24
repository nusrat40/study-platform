import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLoaderData } from 'react-router-dom';

const StudyMaterials = () => {

    const materialData=useLoaderData();

    return (
        <div className="mt-8">
      <Helmet>
        <title>iLearning | Study Materials</title>
      </Helmet>
      <h1 className="text-3xl font-bold text-center">Study Materials</h1>
      {materialData.length === 0 ? (
        <p className="text-center m-5">No materials available for this session.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {materialData.map((material) => (
            <div key={material._id} className="card bg-[#f7f5fa] shadow-xl p-4">
              <img
                src={material.image}
                alt="Material"
                className="rounded-lg w-full h-48 object-cover"
              />
              <div className="mt-4">
                <p className="font-bold">{material.title}</p>
                <div className="mt-4 flex flex-col lg:flex-row gap-2 items-center">
                  <a
                    href={material.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    View on Google Drive
                  </a>
                  <a
                    href={material.image}
                    download={`Material-${material.title}.jpg`}
                    className="btn btn-sm bg-[#a054f4] text-white font-bold"
                  >
                    Download Image
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      

    </div>
    );
};

export default StudyMaterials;