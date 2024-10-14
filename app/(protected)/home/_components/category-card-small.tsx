export function CategoryCardSmall() {
  return (
    <article
    className="flex flex-col shrink-0 gap-y-2 items-center justify-center w-32 p-4 border rounded-md md:w-64 md:flex-row md:p-1.5"
  >
    <div className="h-20 w-20 rounded-full bg-gray-500 md:rounded-md md:w-full"></div>
    <div className="w-full">
      <p className="text-center md:text-left md:w-1/2 md:ml-4">
        Category Name
      </p>
    </div>
  </article>
  )
}