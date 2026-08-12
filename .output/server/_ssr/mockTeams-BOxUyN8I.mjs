//#region node_modules/.nitro/vite/services/ssr/assets/mockTeams-BOxUyN8I.js
var mockTeams = [
	{
		id: "t-001",
		name: "Byte Rangers",
		hackathonId: "hk-001",
		hackathonName: "CodeStorm 2026",
		leader: "Aarav Menon",
		maxMembers: 4,
		requiredSkills: ["DevOps", "ML"],
		lookingForMembers: true,
		submissionStatus: "Submitted",
		members: [{
			userId: "u-001",
			name: "Aarav Menon",
			college: "PSG College of Technology",
			role: "Team Leader",
			skills: ["React", "TypeScript"]
		}, {
			userId: "u-003",
			name: "Rohan Iyer",
			college: "NIT Trichy",
			role: "Member",
			skills: ["Node.js", "MySQL"]
		}]
	},
	{
		id: "t-002",
		name: "Neural Nomads",
		hackathonId: "hk-002",
		hackathonName: "AI Genesis Sprint",
		leader: "Diya Sharma",
		maxMembers: 5,
		requiredSkills: ["Frontend", "MLOps"],
		lookingForMembers: true,
		submissionStatus: "Not Submitted",
		members: [{
			userId: "u-002",
			name: "Diya Sharma",
			college: "IIT Madras",
			role: "Team Leader",
			skills: ["Python", "PyTorch"]
		}, {
			userId: "u-007",
			name: "Aditya Nair",
			college: "CUSAT",
			role: "Member",
			skills: ["Go", "Docker"]
		}]
	},
	{
		id: "t-003",
		name: "Stack Overflowers",
		hackathonId: "hk-001",
		hackathonName: "CodeStorm 2026",
		leader: "Ishita Verma",
		maxMembers: 4,
		requiredSkills: ["Backend", "UI/UX"],
		lookingForMembers: true,
		submissionStatus: "Draft",
		members: [{
			userId: "u-004",
			name: "Ishita Verma",
			college: "VIT Vellore",
			role: "Team Leader",
			skills: ["Flutter", "Firebase"]
		}, {
			userId: "u-009",
			name: "Siddharth Bose",
			college: "Jadavpur University",
			role: "Member",
			skills: ["Rust", "Systems"]
		}]
	},
	{
		id: "t-004",
		name: "Chain Reaction",
		hackathonId: "hk-003",
		hackathonName: "Web3 Builders Jam",
		leader: "Karthik Rajan",
		maxMembers: 4,
		requiredSkills: ["Solidity", "Security"],
		lookingForMembers: false,
		submissionStatus: "Not Submitted",
		members: [{
			userId: "u-005",
			name: "Karthik Rajan",
			college: "SRM Institute of Science & Technology",
			role: "Team Leader",
			skills: ["Solidity", "Next.js"]
		}, {
			userId: "u-010",
			name: "Priya Deshmukh",
			college: "COEP Technological University",
			role: "Member",
			skills: ["IoT", "Embedded C"]
		}]
	},
	{
		id: "t-005",
		name: "Urban Loop",
		hackathonId: "hk-004",
		hackathonName: "SmartCity Hack",
		leader: "Nandini Rao",
		maxMembers: 5,
		requiredSkills: ["GIS", "Data Science"],
		lookingForMembers: true,
		submissionStatus: "Submitted",
		members: [{
			userId: "u-006",
			name: "Nandini Rao",
			college: "Anna University",
			role: "Team Leader",
			skills: ["React", "Mapbox"]
		}, {
			userId: "u-008",
			name: "Meera Krishnan",
			college: "College of Engineering Trivandrum",
			role: "Member",
			skills: ["UI/UX", "Figma"]
		}]
	}
];
/** Team of the demo participant. */
var currentTeam = mockTeams[0];
var allSkills = [
	"React",
	"TypeScript",
	"Node.js",
	"Python",
	"MySQL",
	"Solidity",
	"UI/UX",
	"DevOps",
	"ML",
	"GIS",
	"Security",
	"Data Science",
	"MLOps",
	"Backend",
	"Frontend"
];
//#endregion
export { currentTeam as n, mockTeams as r, allSkills as t };
