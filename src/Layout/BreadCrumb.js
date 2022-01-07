export default function Breadcrumbs({ crumbs }) {
    const theCrumbs = crumbs.map((crumb, index) => {
        if(crumb.link){
            return (
            <li className="breadcrumb-item" key={index}><a href={crumb.link}>{crumb.label}</a></li>
        )} else {
            return (
                <li className="breadcrumb-item active" aria-current="page" key={index}>{crumb.label}</li>
        )}
    })

  return (
    <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
            {theCrumbs}
        </ol>
    </nav>
  );
}