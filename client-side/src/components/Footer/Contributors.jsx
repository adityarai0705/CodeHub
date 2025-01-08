export default function ContributorList({ contributors }) {
  return (
    <div className="contributors grid-contributors">
      <ul className='contributorsGrid'>
        {contributors.map((contributor) => (
          <li className='contributorItem' key={contributor.name}>
            <a
              href={contributor.link}
              target="_blank"
              rel="noopener noreferrer"
              className="contributorLink"
            >
              {contributor.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
