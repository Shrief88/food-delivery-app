interface PerkProps {
  name: string;
  description: string;
  img: string;
}

const Perk = (props: PerkProps) => {
  return (
    <div className="text-center md:flex md:items-start md:text-left lg:block lg:text-center">
      <div className="flex justify-center">
        <img src={props.img} className="w-24"/>
      </div>

      <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
        <h3 className="text-base font-medium text-gray-900">{props.name}</h3>
        <p className="mt-3 text-sm text-muted-foreground">
          {props.description}
        </p>
      </div>
    </div>
  );
};

export default Perk;
