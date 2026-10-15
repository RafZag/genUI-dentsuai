import Image from 'next/image';

function resolveTeamPhoto(photo) {
  if (!photo || typeof photo !== 'string') {
    return '/Team/BM_big.png';
  }

  const fileName = photo.split('/').pop();
  return `/Team/${fileName}`;
}

export default function TeamMember({ member }) {
  const tooltipText =
    member?.hint || 'This is placeholder text for this team member. We will replace it with a proper bio soon.';
  const resolvedPhoto = resolveTeamPhoto(member?.photo);

  return (
    <div className="flex flex-col items-center">
      <div className="group relative">
        <Image src={resolvedPhoto} alt={member.name} width={269} height={269} />
        {/* <div className="pointer-events-none absolute left-1/2 top-full z-10 mt-3 w-64 -translate-x-1/2 rounded-md border border-[#2A2A2A] bg-[#101010]/95 px-3 py-2 text-center text-xs leading-relaxed text-[#DADADA] opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
          {tooltipText}
        </div> */}
      </div>
      <h4 className="text-xl font-medium  mt-4 text-ctMainColor">{member.name}</h4>
      <p className="text-base text-lightGray">{member.role}</p>
    </div>
  );
}
