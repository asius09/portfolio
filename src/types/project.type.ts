export interface ProjectStack {
  buttonKey: string;
  label: string;
  Icon: React.ElementType;
  className: string;
}

export interface Project {
  name: string;
  description: string;
  features: string[];
  stacks: ProjectStack[];
  github: string;
  live: string;
  image: string;
}
