import svgPaths from "./svg-h24saejzqe";

function Navigation() {
  return <div className="absolute h-[361px] left-[32px] top-[159px] w-[232px]" data-name="Navigation" />;
}

function Heading2() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-neutral-950 text-nowrap top-[-0.5px] whitespace-pre">About</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-[rgba(10,10,10,0.5)] top-[0.5px] w-[49px]">2 items</p>
    </div>
  );
}

function Header() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[52px] items-start left-0 top-0 w-[325px]" data-name="Header">
      <Heading2 />
      <Paragraph />
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[16.32px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[29.17%_8.33%_45.84%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-16.68%_-5%_-16.67%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 6">
            <path d={svgPaths.p7d00f00} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.4" strokeWidth="1.36" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[16.67%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-6.25%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 13">
            <path d={svgPaths.pcdd6080} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.4" strokeWidth="1.36" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 size-[16.32px] top-[4.08px]" data-name="Container">
      <Icon />
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[20.4px] overflow-clip relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-[0.53px] whitespace-pre">Introduction</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[32.64px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[12px] text-[rgba(10,10,10,0.6)] top-[0.51px] w-[221px]">Full-stack developer passionate about creating intuitive user experiences</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4.08px] h-[65.28px] items-start left-[28.56px] top-0 w-[262.14px]" data-name="Container">
      <Heading3 />
      <Paragraph1 />
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute h-[65.28px] left-[20.4px] top-[20.4px] w-[290.7px]" data-name="Container">
      <Container />
      <Container1 />
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.7)] h-[106.08px] left-[-3.25px] rounded-[10px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] top-[-3.04px] w-[331.5px]" data-name="Button">
      <Container2 />
    </div>
  );
}

function ListItem() {
  return (
    <div className="h-[104px] relative shrink-0 w-full" data-name="List Item">
      <Button />
    </div>
  );
}

function Icon1() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[29.17%_8.33%_45.84%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-16.68%_-5%_-16.67%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 6">
            <path d={svgPaths.p290adc40} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.4" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[16.67%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-6.25%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 13">
            <path d={svgPaths.p2de20980} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.4" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 size-[16px] top-[4px]" data-name="Container">
      <Icon1 />
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-[0.5px] whitespace-pre">Design Philosophy</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[12px] text-[rgba(10,10,10,0.6)] top-[0.5px] w-[237px]">Approaching problems with simplicity and user-centered thinking</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[64px] items-start left-[28px] top-0 w-[257px]" data-name="Container">
      <Heading4 />
      <Paragraph2 />
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute h-[64px] left-[20px] top-[20px] w-[285px]" data-name="Container">
      <Container3 />
      <Container4 />
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.4)] h-[104px] left-0 rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-0 w-[325px]" data-name="Button">
      <Container5 />
    </div>
  );
}

function ListItem1() {
  return (
    <div className="h-[104px] relative shrink-0 w-full" data-name="List Item">
      <Button1 />
    </div>
  );
}

function List() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[224px] items-start left-0 top-[84px] w-[325px]" data-name="List">
      <ListItem />
      <ListItem1 />
    </div>
  );
}

function Text() {
  return (
    <div className="absolute left-[44.69px] overflow-clip size-[1.02px] top-[165.62px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-neutral-950 top-[-0.45px] w-[323px]">Information item 1 of 2.Currently selected.</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute left-[47px] overflow-clip size-px top-[287px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-neutral-950 top-[-0.5px] w-[380px]">Information item 2 of 2.Press Enter to view details.</p>
    </div>
  );
}

function ColumnNavigation() {
  return (
    <div className="absolute h-[308px] left-[-1px] top-0 w-[325px]" data-name="ColumnNavigation">
      <Header />
      <List />
      <Text />
      <Text1 />
    </div>
  );
}

function Section() {
  return (
    <div className="absolute h-[361px] left-[312px] top-[159px] w-[325px]" data-name="Section">
      <ColumnNavigation />
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 1">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-neutral-950 text-nowrap top-[-0.5px] whitespace-pre">Introduction</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[52px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[26px] left-0 not-italic text-[16px] text-[rgba(10,10,10,0.7)] top-[-0.5px] w-[355px]">Full-stack developer passionate about creating intuitive user experiences</p>
    </div>
  );
}

function Header1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[116px] items-start relative shrink-0 w-full" data-name="Header">
      <Heading1 />
      <Paragraph3 />
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[130px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[26px] left-0 not-italic text-[16px] text-[rgba(10,10,10,0.8)] top-[-0.5px] w-[364px]">I specialize in building scalable web applications that bridge the gap between beautiful design and robust functionality. With a background in both development and design, I bring a unique perspective to every project.</p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[130px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[26px] left-0 not-italic text-[16px] text-[rgba(10,10,10,0.8)] top-[-0.5px] w-[339px]">Currently based in San Francisco, I work with startups and established companies to bring their digital visions to life. I believe in writing clean, maintainable code and creating experiences that users genuinely enjoy.</p>
    </div>
  );
}

function Article() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.3)] box-border content-stretch flex flex-col gap-[32px] h-[488px] items-start left-[684px] pb-0 pt-[24px] px-[24px] rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[159px] w-[418.25px]" data-name="Article">
      <Header1 />
      <Paragraph4 />
      <Paragraph5 />
    </div>
  );
}

function Heading5() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 1">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-neutral-950 text-nowrap top-[-0.5px] whitespace-pre">Alex Chen</p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-[rgba(10,10,10,0.6)] top-[-0.5px] w-[174px]">{`Full-Stack Developer & Designer`}</p>
    </div>
  );
}

function Header2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[99px] items-start relative shrink-0 w-[176px]" data-name="Header">
      <Heading5 />
      <Paragraph6 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[10px] items-start left-[40px] p-[10px] top-[32px] w-[1062px]">
      <Header2 />
    </div>
  );
}

function ColumnNavigation1() {
  return (
    <div className="absolute bg-white h-[857px] left-0 top-0 w-[1135px]" data-name="ColumnNavigation">
      <Navigation />
      <Section />
      <Article />
      <Frame1 />
    </div>
  );
}

function ColumnNavigation2() {
  return (
    <div className="absolute left-[-1px] overflow-clip size-px top-[-1px]" data-name="ColumnNavigation">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-neutral-950 text-nowrap top-[-0.5px] whitespace-pre">Skip to main content</p>
    </div>
  );
}

function ColumnNavigation3() {
  return <div className="absolute left-[-1px] size-px top-[-1px]" data-name="ColumnNavigation" />;
}

function Text2() {
  return (
    <div className="absolute content-stretch flex h-[19px] items-start left-[16px] top-[14.5px] w-[46.453px]" data-name="Text">
      <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[16px] text-neutral-950 text-nowrap whitespace-pre">About</p>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.5)] h-[48px] left-[4px] rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-0 w-[231.75px]" data-name="Button">
      <Text2 />
    </div>
  );
}

function ListItem2() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="List Item">
      <Button2 />
    </div>
  );
}

function Text3() {
  return (
    <div className="absolute content-stretch flex h-[19px] items-start left-[16px] top-[14.5px] w-[112.227px]" data-name="Text">
      <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[16px] text-[rgba(10,10,10,0.7)] text-nowrap whitespace-pre">Selected Work</p>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute h-[48px] left-0 rounded-[8px] top-0 w-[231.75px]" data-name="Button">
      <Text3 />
    </div>
  );
}

function ListItem3() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="List Item">
      <Button3 />
    </div>
  );
}

function Text4() {
  return (
    <div className="absolute content-stretch flex h-[19px] items-start left-[16px] top-[14.5px] w-[85.602px]" data-name="Text">
      <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[16px] text-[rgba(10,10,10,0.7)] text-nowrap whitespace-pre">Experience</p>
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute h-[48px] left-0 rounded-[8px] top-0 w-[231.75px]" data-name="Button">
      <Text4 />
    </div>
  );
}

function ListItem4() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="List Item">
      <Button4 />
    </div>
  );
}

function Text5() {
  return (
    <div className="absolute content-stretch flex h-[19px] items-start left-[16px] top-[14.5px] w-[90.594px]" data-name="Text">
      <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[16px] text-[rgba(10,10,10,0.7)] text-nowrap whitespace-pre">Capabilities</p>
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute h-[48px] left-0 rounded-[8px] top-0 w-[231.75px]" data-name="Button">
      <Text5 />
    </div>
  );
}

function ListItem5() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="List Item">
      <Button5 />
    </div>
  );
}

function Text6() {
  return (
    <div className="absolute content-stretch flex h-[19px] items-start left-[16px] top-[14.5px] w-[65.039px]" data-name="Text">
      <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[16px] text-[rgba(10,10,10,0.7)] text-nowrap whitespace-pre">Connect</p>
    </div>
  );
}

function Button6() {
  return (
    <div className="absolute h-[48px] left-0 rounded-[8px] top-0 w-[231.75px]" data-name="Button">
      <Text6 />
    </div>
  );
}

function ListItem6() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="List Item">
      <Button6 />
    </div>
  );
}

function List1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[256px] items-start left-0 top-px w-[231.75px]" data-name="List">
      <ListItem2 />
      <ListItem3 />
      <ListItem4 />
      <ListItem5 />
      <ListItem6 />
    </div>
  );
}

function Text7() {
  return (
    <div className="absolute left-[65.45px] overflow-clip size-px top-[12px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-neutral-950 top-[-0.5px] w-[250px]">Section 1 of 5.Currently selected.</p>
    </div>
  );
}

function Text8() {
  return (
    <div className="absolute left-[127.23px] overflow-clip size-px top-[64px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-[rgba(10,10,10,0.7)] top-[-0.5px] w-[271px]">Section 2 of 5.Press Enter to select.</p>
    </div>
  );
}

function Text9() {
  return (
    <div className="absolute left-[100.6px] overflow-clip size-px top-[116px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-[rgba(10,10,10,0.7)] top-[-0.5px] w-[271px]">Section 3 of 5.Press Enter to select.</p>
    </div>
  );
}

function Text10() {
  return (
    <div className="absolute left-[105.59px] overflow-clip size-px top-[168px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-[rgba(10,10,10,0.7)] top-[-0.5px] w-[271px]">Section 4 of 5.Press Enter to select.</p>
    </div>
  );
}

function Text11() {
  return (
    <div className="absolute left-[80.04px] overflow-clip size-px top-[220px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-[rgba(10,10,10,0.7)] top-[-0.5px] w-[271px]">Section 5 of 5.Press Enter to select.</p>
    </div>
  );
}

function ColumnNavigation4() {
  return (
    <div className="absolute h-[257px] left-[32px] top-[159px] w-[236px]" data-name="ColumnNavigation">
      <List1 />
      <Text7 />
      <Text8 />
      <Text9 />
      <Text10 />
      <Text11 />
    </div>
  );
}

function ColumnNavigation5() {
  return (
    <div className="absolute left-[707.75px] overflow-clip size-px top-[203px]" data-name="ColumnNavigation">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-neutral-950 text-nowrap top-[-0.5px] whitespace-pre">Additional Details</p>
    </div>
  );
}

function ColumnNavigation6() {
  return (
    <div className="absolute left-[707.75px] overflow-clip size-px top-[365px]" data-name="ColumnNavigation">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-neutral-950 text-nowrap top-[-0.5px] whitespace-pre">Content</p>
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute left-[13px] size-[16px] top-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p14890d00} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p28db2b80} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="absolute bg-white h-[36px] left-[976.85px] rounded-[8px] top-[16px] w-[142.148px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <Icon2 />
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-[45px] not-italic text-[14px] text-neutral-950 text-nowrap top-[8.5px] whitespace-pre">Edit Content</p>
    </div>
  );
}

export default function MinimalPortfolioWebsiteDesign() {
  return (
    <div className="bg-white relative size-full" data-name="Minimal Portfolio Website Design">
      <ColumnNavigation1 />
      <ColumnNavigation2 />
      <ColumnNavigation3 />
      <ColumnNavigation4 />
      <ColumnNavigation5 />
      <ColumnNavigation6 />
      <Button7 />
    </div>
  );
}