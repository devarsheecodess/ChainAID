import React from 'react'

const Organisations = () => {
    return (
        <div>
            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Organizations You Can Help</h2>
                    <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                        ChainAid partners with verified organizations that provide essential services to those in need.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Organization Card 1 */}
                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="h-48 bg-gray-200">
                                <img src="/api/placeholder/400/300" alt="Sunshine Orphanage" className="w-full h-full object-cover" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Sunshine Orphanage</h3>
                                <p className="text-gray-600 mb-4">
                                    Providing shelter, education, and care for 45 children in need of loving homes.
                                </p>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-indigo-600">Goal: Ξ 3.5 ETH</span>
                                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm">Donate</button>
                                </div>
                            </div>
                        </div>

                        {/* Organization Card 2 */}
                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="h-48 bg-gray-200">
                                <img src="/api/placeholder/400/300" alt="Silver Years Home" className="w-full h-full object-cover" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Silver Years Home</h3>
                                <p className="text-gray-600 mb-4">
                                    Supporting elderly residents with medical care, companionship, and dignity.
                                </p>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-indigo-600">Goal: Ξ 2.8 ETH</span>
                                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm">Donate</button>
                                </div>
                            </div>
                        </div>

                        {/* Organization Card 3 */}
                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="h-48 bg-gray-200">
                                <img src="/api/placeholder/400/300" alt="Hope Medical Center" className="w-full h-full object-cover" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Hope Medical Center</h3>
                                <p className="text-gray-600 mb-4">
                                    Providing essential healthcare services to underserved communities.
                                </p>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-indigo-600">Goal: Ξ 4.2 ETH</span>
                                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm">Donate</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-10">
                        <button className="px-6 py-3 border border-indigo-600 text-indigo-600 font-medium rounded-full hover:bg-indigo-50 transition-colors duration-200">
                            View All Organizations
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Organisations
