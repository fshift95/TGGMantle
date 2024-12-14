// SPDX-License-Identifier: GPL-3.0
//import "@openzeppelin/contracts@v4.9.3/token/ERC20/IERC20.sol";
//import "@openzeppelin/contracts@v4.9.3/token/ERC20/extensions/IERC20Metadata.sol";
pragma solidity >=0.7.0 <0.9.0;


contract winWalletMantle{

    struct Participant{
         uint amount;
        uint timestamp;
        bool isPaid;
    }

  
   address private MantleMNGTokenAddress=0xdf7930B460d4508bE940D1Eb4aA8e39BC68ea943; //MNGToken on Mantle test net

    address payable owner;
    uint potSetTime;
    mapping (address => Participant) participants;

   
    address payable winwallet2;
    address payable winwallet3;





 address payable winwallet1;
string private wallet1;

function store_wallet1(string memory s,address payable  winwall1) public onlyOwner{
    wallet1=s;
    winwallet1=winwall1;
}
function claimedWallet() public view onlyOwner  returns(string memory ){
    return  wallet1;
}

function walletAddress1() public view   returns(address ){
    return  winwallet1;
}





    constructor() {
        owner=payable (msg.sender);
        potSetTime=block.timestamp;
    
      
    }




  



    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }


    /**
   * @dev Allows the current owner to transfer control of the contract to a newOwner.
   * @param newOwner The address to transfer ownership to.
   */
   
  function transferOwnership(address payable  newOwner) public onlyOwner {
    require(newOwner != address(0));
    owner = newOwner;
  }
  


//should use any address

  function withdraw() public onlyOwner{
        uint amount = IERC20(MantleMNGTokenAddress).balanceOf(address(this));
     IERC20(MantleMNGTokenAddress).transfer(owner, amount);
    }
    

    
      function getHightest()public view  returns(uint,uint,uint,address,address,address){
        return (highScore[0],highScore[1],highScore[2],highScoreAddres[0],highScoreAddres[1],highScoreAddres[2]);
    }

    function getHighFirstScore()public view  returns(uint){
        return (highScore[0]);
    }
    function getHighsecondScore()public view  returns(uint){
        return (highScore[1]);
    }
    function getHighthirdScore()public view  returns(uint){
        return (highScore[2]);
    }
    function getHighfirstdadd()public view  returns(address){
        return (highScoreAddres[0]);
    }
    
    function getHighseconddadd()public view  returns(address){
        return (highScoreAddres[1]);
    }
    
    function getHighthirdadd()public view  returns(address){
        return (highScoreAddres[2]);
    }


mapping (address => uint)  _playerTotalPay;
mapping (address => uint)  _playerShots;
mapping (address => uint)  _playerScores;

 
function getPotSetTime()external view  returns(uint entfee){
        return (potSetTime);
    }


function getPlayerScore (address _playerAddress) external view  returns (uint shots){
    return _playerScores[_playerAddress];
}




    function checkPot()  external   {
       
            this.prizeDistributer();
        
    }



    receive() external payable { 

    }




function getTotalStokenBalance() external view returns(uint){
return IERC20(MantleMNGTokenAddress).balanceOf(address(this));
}


    

    function prizeDistributer()  public  payable  {

 uint Pot= IERC20(MantleMNGTokenAddress).balanceOf(address(this));

        if(Pot > 10000){
       
        uint distPot =Pot-1000; //owner share
        if(highScore[2]!=0){ //there is 3 high score
        IERC20(MantleMNGTokenAddress).transfer(highScoreAddres[0],distPot/3);
         IERC20(MantleMNGTokenAddress).transfer(highScoreAddres[1],distPot/3);
         IERC20(MantleMNGTokenAddress).transfer(highScoreAddres[2],distPot/3);

        }else{
            if(highScore[1]!=0){ //there is 2 high score
                    IERC20(MantleMNGTokenAddress).transfer(highScoreAddres[0],distPot/2);
                   IERC20(MantleMNGTokenAddress).transfer(highScoreAddres[1],distPot/2);

             }else{
                if(highScore[0]!=0){ //there is 1 high score
                    IERC20(MantleMNGTokenAddress).transfer(highScoreAddres[0],distPot);
                }
        }
        }
      
      
        }
         IERC20(MantleMNGTokenAddress).transfer(owner,IERC20(MantleMNGTokenAddress).balanceOf(address(this)));
  
        highScore=[0,0,0];
        highScoreAddres=[payable (address(0)) ,payable (address(0)) ,payable (address(0)) ];

    }

  

uint[3] highScore=[0,0,0];
address payable [3] highScoreAddres;

    


    
    function setScore( uint score)  external   {
       
        if(score>highScore[0]){
            highScore[2]=highScore[1];
            highScoreAddres[2]=highScoreAddres[1];
            highScore[1]=highScore[0];
             highScoreAddres[1]=highScoreAddres[0];
            highScore[0]=score;
             highScoreAddres[0]=payable (msg.sender);
        }else if(score>highScore[1]){
            highScore[2]=highScore[1];
             highScoreAddres[2]=highScoreAddres[1];
            highScore[1]=score;
                highScoreAddres[1]=payable (msg.sender);
        }else if(score>highScore[2]){
            highScore[2]=score;
             highScoreAddres[2]=payable (msg.sender);
        }      

        if(score >  _playerScores[msg.sender]){
        _playerScores[msg.sender]=score; 
        }
       
    }



}