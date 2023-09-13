import React from 'react';

const SeoDrawer = () => {
  const [showSEODrawer, setShowSEODrawer] = React.useState(false);

  return (
    <>
      {showSEODrawer === true ? null : (
        <div className='text-center'>
          <button
            className='flex items-center justify-center w-1/2 px-5 py-2 text-sm capitalize transition-colors duration-200 bg-rose-700 border rounded-md sm:w-auto gap-x-2 hover:bg-transparent hover:text-rose-700 hover:border-rose-700 active:ring-2 active:ring-rose-700'
            type='button'
            onClick={() => setShowSEODrawer((previousState) => !previousState)}
          >
            Show right drawer
          </button>
        </div>
      )}
      {/* <!-- drawer component --> */}
      {showSEODrawer === true && (
        <aside className='w-[25rem] sticky top-0 right-0'>
          <section className=''>
            <button
              className='flex items-center justify-center w-1/2 px-5 py-2 text-sm capitalize transition-colors duration-200 bg-rose-700 border rounded-md sm:w-auto gap-x-2 hover:bg-transparent hover:text-rose-700 hover:border-rose-700 active:ring-2 active:ring-rose-700'
              type='button'
              onClick={() =>
                setShowSEODrawer((previousState) => !previousState)
              }
            >
              Close
            </button>
            <div className='w-full'>
              <p>Post Metadata</p>
              <div>
                <div className='flex items-center justify-center w-full'>
                  <label className='flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50'>
                    <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                      <svg
                        className='w-8 h-8 mb-4 text-gray-500'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 20 16'
                      >
                        <path
                          stroke='currentColor'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
                        />
                      </svg>
                      <p className='mb-2 text-sm text-gray-500'>
                        <span className='font-semibold'>Click to upload</span>{' '}
                        or drag and drop
                      </p>
                      <p className='text-xs text-gray-500'>
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <input type='file' className='hidden' />
                  </label>
                </div>
              </div>
            </div>

            <div className='w-full'>
              <p>Tags</p>
              <div>
                <form className=''>
                  <div className='flex flex-col gap-2'>
                    <div className='inline-flex items-center gap-2'>
                      <input
                        type='text'
                        className='appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500'
                        placeholder='Enter some tags'
                      />

                      <div className='p-2 text-sm bg-white rounded shadow-lg border border-gray-300'>
                        Add
                      </div>
                    </div>

                    <ul className='flex flex-wrap gap-2'>
                      <li className='bg-blue-100 inline-flex items-center text-sm rounded overflow-hidden w-fit'>
                        <span className='leading-relaxed truncate px-1'>
                          tag
                        </span>
                        <button
                          title='submit'
                          type='submit'
                          className='w-6 h-8 inline-block align-middle text-gray-500 bg-blue-200 focus:outline-none'
                        >
                          X
                        </button>
                      </li>
                      <li className='bg-blue-100 inline-flex items-center text-sm rounded overflow-hidden w-fit'>
                        <span className='leading-relaxed truncate px-1'>
                          auth
                        </span>
                        <button
                          title='submit'
                          type='submit'
                          className='w-6 h-8 inline-block align-middle text-gray-500 bg-blue-200 focus:outline-none'
                        >
                          X
                        </button>
                      </li>
                    </ul>
                  </div>
                </form>
              </div>
            </div>

            <div className='w-full'>
              <p>Published on</p>

              <div>
                <form className='w-full'>
                  <div className='inline-flex items-center gap-2'>
                    <input
                      type='text'
                      className='appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500'
                      placeholder='Enter'
                    />
                  </div>
                </form>
              </div>
            </div>

            <div className='w-full'>
              <p>Caption</p>

              <div>
                <form className='w-full'>
                  <div className='inline-flex items-center gap-2'>
                    <input
                      type='text'
                      className='appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500'
                      placeholder='Enter'
                    />
                  </div>
                </form>
              </div>
            </div>

            <div className='w-full'>
              <p>Post URL</p>
              <div>
                <div className='inline-flex flex-col items-center gap-1'>
                  <input
                    type='text'
                    className='appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500'
                    placeholder='Enter some tags'
                  />
                  <p className='text-sm text-gray-600'>{`https://bloggkie.vercel.app/blog/`}</p>
                </div>
              </div>
            </div>

            <div>
              <p>Description</p>

              <label>
                <textarea
                  title='Description'
                  className='w-full resize-none h-20 appearance-none block bg-white text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500'
                ></textarea>
              </label>
            </div>

            <div>
              <p>Status</p>
              <input title='Status' type='checkbox' className='toggle' />
            </div>

            <div className='w-full'>
              <p>Make it viewable by the added users below</p>
              <div>
                <form className=''>
                  <div className='flex flex-col gap-2'>
                    <div className='inline-flex items-center gap-2'>
                      <input
                        type='text'
                        className='appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500'
                        placeholder='Enter user email to add'
                      />

                      <div className='p-2 text-sm bg-white rounded shadow-lg border border-gray-300'>
                        Add
                      </div>
                    </div>

                    <ul className='flex flex-wrap gap-2'>
                      <li className='bg-blue-100 inline-flex items-center text-sm rounded overflow-hidden w-fit'>
                        <span className='leading-relaxed truncate px-1'>
                          rockyessel@gmail.com
                        </span>
                        <button
                          title='submit'
                          type='submit'
                          className='w-6 h-8 inline-block align-middle text-gray-500 bg-blue-200 focus:outline-none'
                        >
                          X
                        </button>
                      </li>
                      <li className='bg-blue-100 inline-flex items-center text-sm rounded overflow-hidden w-fit'>
                        <span className='leading-relaxed truncate px-1'>
                          esselme@gmail.com
                        </span>
                        <button
                          title='submit'
                          type='submit'
                          className='w-6 h-8 inline-block align-middle text-gray-500 bg-blue-200 focus:outline-none'
                        >
                          X
                        </button>
                      </li>
                    </ul>
                  </div>
                </form>
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <button
                type='button'
                className='inline-block rounded bg-blue-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-blue-700 transition duration-150 ease-in-out hover:bg-blue-100 focus:bg-blue-100 focus:outline-none focus:ring-0 active:bg-blue-200'
              >
                Publish
              </button>
              <button
                type='button'
                className='inline-block rounded bg-blue-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-blue-700 transition duration-150 ease-in-out hover:bg-blue-100 focus:bg-blue-100 focus:outline-none focus:ring-0 active:bg-blue-200'
              >
                Preview
              </button>
              <button
                type='button'
                className='inline-block rounded bg-blue-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-blue-700 transition duration-150 ease-in-out hover:bg-blue-100 focus:bg-blue-100 focus:outline-none focus:ring-0 active:bg-blue-200'
              >
                Saved
              </button>
            </div>
            <div className='flex items-center gap-2'>
              <button
                type='button'
                className='inline-block rounded bg-blue-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-blue-700 transition duration-150 ease-in-out hover:bg-blue-100 focus:bg-blue-100 focus:outline-none focus:ring-0 active:bg-blue-200'
              >
                Publish
              </button>
              <button
                type='button'
                className='inline-block rounded bg-blue-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-blue-700 transition duration-150 ease-in-out hover:bg-blue-100 focus:bg-blue-100 focus:outline-none focus:ring-0 active:bg-blue-200'
              >
                Preview
              </button>
              <button
                type='button'
                className='inline-block rounded bg-blue-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-blue-700 transition duration-150 ease-in-out hover:bg-blue-100 focus:bg-blue-100 focus:outline-none focus:ring-0 active:bg-blue-200'
              >
                Saved
              </button>
            </div>
            <div className='flex items-center gap-2'>
              <button
                type='button'
                className='inline-block rounded bg-blue-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-blue-700 transition duration-150 ease-in-out hover:bg-blue-100 focus:bg-blue-100 focus:outline-none focus:ring-0 active:bg-blue-200'
              >
                Publish
              </button>
              <button
                type='button'
                className='inline-block rounded bg-blue-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-blue-700 transition duration-150 ease-in-out hover:bg-blue-100 focus:bg-blue-100 focus:outline-none focus:ring-0 active:bg-blue-200'
              >
                Preview
              </button>
              <button
                type='button'
                className='inline-block rounded bg-blue-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-blue-700 transition duration-150 ease-in-out hover:bg-blue-100 focus:bg-blue-100 focus:outline-none focus:ring-0 active:bg-blue-200'
              >
                Saved
              </button>
            </div>
            <div className='flex items-center gap-2'>
              <button
                type='button'
                className='inline-block rounded bg-blue-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-blue-700 transition duration-150 ease-in-out hover:bg-blue-100 focus:bg-blue-100 focus:outline-none focus:ring-0 active:bg-blue-200'
              >
                Publish
              </button>
              <button
                type='button'
                className='inline-block rounded bg-blue-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-blue-700 transition duration-150 ease-in-out hover:bg-blue-100 focus:bg-blue-100 focus:outline-none focus:ring-0 active:bg-blue-200'
              >
                Preview
              </button>
              <button
                type='button'
                className='inline-block rounded bg-blue-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-blue-700 transition duration-150 ease-in-out hover:bg-blue-100 focus:bg-blue-100 focus:outline-none focus:ring-0 active:bg-blue-200'
              >
                Saved
              </button>
            </div>
            <div className='flex items-center gap-2'>
              <button
                type='button'
                className='inline-block rounded bg-blue-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-blue-700 transition duration-150 ease-in-out hover:bg-blue-100 focus:bg-blue-100 focus:outline-none focus:ring-0 active:bg-blue-200'
              >
                Publish
              </button>
              <button
                type='button'
                className='inline-block rounded bg-blue-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-blue-700 transition duration-150 ease-in-out hover:bg-blue-100 focus:bg-blue-100 focus:outline-none focus:ring-0 active:bg-blue-200'
              >
                Preview
              </button>
              <button
                type='button'
                className='inline-block rounded bg-blue-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-blue-700 transition duration-150 ease-in-out hover:bg-blue-100 focus:bg-blue-100 focus:outline-none focus:ring-0 active:bg-blue-200'
              >
                Saved
              </button>
            </div>
          </section>
        </aside>
      )}
    </>
  );
};

export default SeoDrawer;
