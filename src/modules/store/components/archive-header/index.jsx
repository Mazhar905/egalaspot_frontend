import Breadcrumbs from "@modules/common/components/breadcurmbs"
import RefinementList from "@modules/store/components/refinement-list"
export default async function ArchiveHeader({ title, sortBy }) {
  return (
    <div className="flex flex-col items-center justify-between w-full py-5 px-2">
      <div className="w-full">
        <Breadcrumbs />
      </div>
      <div className="flex mb-8 text-2xl-semi w-full justify-between">
        <h1 className="text-2xl-semi" data-testid="store-page-title">
          {title}
        </h1>
        <RefinementList sortBy={sortBy || "created_at"} />
      </div>
    </div>
  )
}
