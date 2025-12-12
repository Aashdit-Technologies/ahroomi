"use client";
import { useState } from "react";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

export default function ProductDescription() {
  const [activeTab, setActiveTab] = useState("description");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const tabs = [
    { id: "description", label: "Description" },
    { id: "additional", label: "Additional information" },
    { id: "reviews", label: "Reviews (1)" },
  ];

  const reviews = [
    {
      id: 1,
      author: "admin",
      date: "February 19, 2021",
      rating: 5,
      title: "I review for Drive Me Glazy Lip Gloss",
      content: "Seq perspicials undo omnis iste natus error sit voluptatem accusantium doloremque laudentum."
    }
  ];

  const handleStarClick = (starIndex: number) => {
    setRating(starIndex + 1);
  };

  const handleStarHover = (starIndex: number) => {
    setHoverRating(starIndex + 1);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  return (
    <section className="pt-5 pb-12">
      <div className="container mx-auto px-4">
        {/* Tab Navigation */}
        <div className="mb-5">
          <div className="flex flex-wrap border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2.5 text-base font-semibold transition-colors ${
                  activeTab === tab.id
                    ? "text-[#22a6dd] border-b-2 border-[#22a6dd]"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-4xl">
          {/* Description Tab */}
          {activeTab === "description" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
              <div className="prose max-w-none">
                <p className="text-gray-600 leading-relaxed mb-4">
                  <strong>Quisque varius diam vel metus mattis, id aliquam diam rhoncus.</strong> Proin vitae magna in dui finibus malesuada et at nulla. Morbi elit ex, viverra vitae ante vel, blandit feugiat ligula. Fusce fermentum laculis nibh, at sodales leo maximus a. Nullam ultricies sodales nunc, in pellentesque lorem mattis quis. Cras imperdiet est in nunc tristique lacinia. Nullam aliquam mauris eu accumsan tincidunt. Suspendisse velit ex, aliquet vel ornare vel, dignissim a tortor.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  <strong>Morbi ut sapien vitae odio accumsan gravida.</strong> Morbi vitae erat auctor, eleifend nunc a, lobortis neque. Praesent aliquam dignissim viverra. Maceenas lacus odio, feugiat eu nunc sit amet, maximus sagittis dolor. Vivamus nisi sapien, elementum sit amet eros sit amet, ultricies cursus ipsum. Sed consequat luctus ligula. Curabitur laoreet rhoncus blandit. Aenean vel diam ut arcu pharetra dignissim ut sed leo. Vivamus faucibus, ipsum in vestibulum vulputate, lorem orci convallis quam, sit amet consequat nulla felis pharetra lacus. Duis semper erat mauris, sed egestas purus commodo vel.
                </p>
              </div>
            </div>
          )}

          {/* Additional Information Tab */}
          {activeTab === "additional" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Additional information</h2>
              <div className="overflow-hidden border border-gray-200 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50 w-1/3">
                        Weight
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        N/A
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                        Color
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <div className="flex flex-wrap gap-2">
                          {['Black', 'Blue', 'Orange', 'Red'].map((color) => (
                            <span
                              key={color}
                              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                            >
                              {color}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === "reviews" && (
            <div className="space-y-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Reviews (1)</h2>

              {/* Existing Reviews */}
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{review.title}</h3>
                        <div className="flex items-center gap-4 mt-1">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className="text-yellow-500">
                                {i < review.rating ? (
                                  <FaStar />
                                ) : (
                                  <FaRegStar />
                                )}
                              </span>
                            ))}
                          </div>
                          <div className="text-sm text-gray-500">
                            <span className="font-medium">{review.author}</span> – {review.date}
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{review.content}</p>
                  </div>
                ))}
              </div>

              {/* Add Review Form */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Add a review</h3>
                <p className="text-gray-600 text-sm">
                  Your email address will not be published. Required fields are marked *
                </p>

                <form className="space-y-6">
                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Your rating *
                    </label>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => {
                        const starValue = i + 1;
                        return (
                          <button
                            key={i}
                            type="button"
                            onClick={() => handleStarClick(i)}
                            onMouseEnter={() => handleStarHover(i)}
                            onMouseLeave={handleStarLeave}
                            className="text-2xl focus:outline-none"
                          >
                            {starValue <= (hoverRating || rating) ? (
                              <FaStar className="text-yellow-500" />
                            ) : (
                              <FaRegStar className="text-gray-300" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Review Textarea */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Your review *
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Write your review here..."
                    />
                  </div>

                  {/* Name Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Your email"
                    />
                  </div>

                  {/* Checkbox */}
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="save-info"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </div>
                    <label htmlFor="save-info" className="ml-2 text-sm text-gray-600">
                      Save my name, email, and website in this browser for the next time I comment.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="px-8 py-2.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-black transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}