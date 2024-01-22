import Breadcrumbs from "@/Components/Breadcrumbs";


export default function category({ params }: { params: { slug: string } }) {
 
  return (
    <div className="flex min-h-screen bg-gray-100">
         <Breadcrumbs/>
    </div>
  );
}