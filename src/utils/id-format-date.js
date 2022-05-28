export default function idFormatDate(date,locale,opt=""){

	let theDate = new Date(date);
	return theDate.toLocaleString(locale,opt)

}